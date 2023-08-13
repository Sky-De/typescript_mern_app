import "./style.scss";
import bookCover from "../../assets/images/book-cover-min.jpg";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { closeModel, openModel } from "../../redux/features/model/modelSlice";
import { Post, setSelectedPost } from "../../redux/features/post/postSlice";
import { likePost } from "../../redux/features/post/postActionCreators";
import { bookMarkPost } from "../../redux/features/user/userActionCreators";
import EditBtn from "../buttons/EditBtn";
import DelelteBtn from "../buttons/DelelteBtn";
import PostStatus from "../postStatus/PostStatus";
import axios from "axios";
import { useTextLimiter } from "../../hooks/useTextLimiter";
import { activeAlert } from "../../redux/features/alert/alertSlice";

type IsProfile = {
  isProfile?: boolean;
};
type BookCardProps = Post & IsProfile;

const BookCard: FC<BookCardProps> = (props) => {
  const {
    title,
    bookAuthor,
    desc,
    coverUrl,
    _id,
    likes,
    createdBy,
    isDetails,
    createdAt,
    isProfile,
  } = props;

  const dispatch = useAppDispatch();
  const { user } = useAppSelectore((state) => state.user);
  const isUserPost = user ? (createdBy === user._id ? true : false) : false;
  const shortDescription = useTextLimiter({ limit: 150, text: desc });

  const [isBookedMarked, setIsBookMarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [creatorInfo, setCreatorInfo] = useState<{
    name: string;
    imgUrl: string;
  }>({ name: "", imgUrl: "" });

  const handleBookMark = () => {
    if (!user) {
      dispatch(
        activeAlert({
          type: "WARNING",
          message: "You must login fist, tap login button!",
        })
      );
      return;
    }
    dispatch(bookMarkPost(_id));
  };
  const handleLike = () => {
    if (!user) {
      dispatch(
        activeAlert({
          type: "WARNING",
          message: "You must login first, tap login button!",
        })
      );
      return;
    }
    dispatch(likePost(_id));
  };

  useEffect(() => {
    if (user && likes && likes?.indexOf(user?._id) !== -1) setIsLiked(true);
    else setIsLiked(false);
  }, [likes, dispatch, _id, user]);

  useEffect(() => {
    if (user && user?.bookMarks?.indexOf(_id) !== -1) setIsBookMarked(true);
    else setIsBookMarked(false);
  }, [user?.bookMarks, dispatch, _id, user]);

  // gets post creator name and imgUrl
  // show case for fetching data within component
  useEffect(() => {
    const getName = async () => {
      if (createdBy) {
        try {
          const { data } = await axios.get(
            `https://puce-worried-barnacle.cyclic.app/api/v1/user/${createdBy}/name`
          );
          setCreatorInfo({ name: data.name, imgUrl: data.imgUrl });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getName();
  }, [createdBy]);

  const handleSeeMore = () => {
    dispatch(setSelectedPost({ ...props, isDetails: true }));
    dispatch(openModel("SHOW"));
  };

  const handleCloseModel = () => dispatch(closeModel());

  return (
    <li className={`card ${isDetails ? "fullWidth isDetails" : ""}`}>
      {isUserPost && isProfile && <DelelteBtn {...props} />}
      {isUserPost && isProfile && <EditBtn {...props} />}
      <div className="card__title">
        <PostStatus
          name={creatorInfo.name}
          createdAt={createdAt}
          imgUrl={creatorInfo.imgUrl ? creatorInfo.imgUrl : ""}
        />
        <div>
          <h2 className="card__title--name">{title}</h2>
          <h3 className="card__title--author">{bookAuthor}</h3>
        </div>
      </div>

      <div className="card__info">
        <p className="card__info--desc">
          {isDetails === undefined ? `${shortDescription}` : desc}
        </p>
        <div className="card__info--coverWraper">
          <img
            loading="lazy"
            className="card__info--cover"
            src={coverUrl === "" ? bookCover : coverUrl}
            alt={`cover for ${title}`}
          />
        </div>
      </div>
      <div className="card__action">
        {!isDetails && <button onClick={handleSeeMore}>see more</button>}
        {/* FIX */}
        {!isDetails ? (
          <>
            <span className="card__action--likes">
              {likes.length > 0 && likes.length.toLocaleString()}
            </span>
            {/* like------ */}
            <button onClick={handleLike} className="card__action--like btn">
              <i
                className={`bx ${isLiked ? "bxs-like" : "bx-like"} ${
                  user ? "" : "disable"
                }`}
                title="Like"
              ></i>
            </button>
            {/* bookmark------ */}
            <button
              onClick={handleBookMark}
              className="card__action--bookMark btn"
            >
              <i
                className={`bx ${
                  isBookedMarked ? "bxs-bookmark" : "bx-bookmark"
                } ${user ? "" : "disable"}`}
                title="BookMark"
              ></i>
            </button>
          </>
        ) : (
          <button style={{ marginLeft: "auto" }} onClick={handleCloseModel}>
            Close
          </button>
        )}
      </div>
    </li>
  );
};

export default BookCard;
