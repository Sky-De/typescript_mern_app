import "./style.scss";
import { useEffect, useState } from "react";
import { useAppSelectore } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import UserPosts from "../../components/userPosts/UserPosts";
import BookMarks from "../../components/booMarks/BookMarks";
import { useDispatch } from "react-redux";
import { openModel } from "../../redux/features/model/modelSlice";
import SettingBtn from "../../components/buttons/SettingBtn";
import BackBtn from "../../components/buttons/BackBtn";

const Profile: React.FC = () => {
  const [isUserPosts, setIsUserPosts] = useState<boolean>(true);
  const { user } = useAppSelectore((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // without user can not access profile Page
  useEffect(() => {
    if (!user) {
      navigate("/");
      dispatch(openModel("AUTH"));
    }
  }, [isUserPosts, dispatch, navigate, user]);
  // last dispatch,navigate,user

  const showPostsHandler = () => setIsUserPosts(true);
  const showBookMarksHandler = () => setIsUserPosts(false);

  return (
    <main className="profile">
      <div className="profile__intro">
        <div className="profile__intro--userAction">
          <p title="User Name">{user?.name}</p>
          <SettingBtn />
        </div>
        <BackBtn path="/" />
      </div>
      <div className="profile__tabs">
        <span
          className={isUserPosts ? "active" : ""}
          onClick={showPostsHandler}
        >
          Posts
        </span>
        <span
          className={isUserPosts ? "" : "active"}
          onClick={showBookMarksHandler}
        >
          Bookmarks
        </span>
      </div>

      {isUserPosts && <UserPosts />}
      {!isUserPosts && <BookMarks />}
    </main>
  );
};

export default Profile;
