import { FC } from "react";
import useTimeAgo from "../../hooks/useTimeAgo";
import CircularLoading from "../loading/CircularLoading";
import Avatar from "../../assets/icons/avatar.png";
import "./style.scss";

type PostStatusProps = {
  createdAt: Date;
  name: string;
  imgUrl: string;
};

const PostStatus: FC<PostStatusProps> = ({ createdAt, name, imgUrl }) => {
  const timeAgoPosted = useTimeAgo({ createdDate: createdAt });

  const renderTimeAgo = (
    timeAgo: { value: number; unit: string } | null
  ): JSX.Element => {
    if (timeAgo) {
      return (
        <span className="postStatus__info--createdAt">{` ${timeAgo.value} ${
          timeAgo.unit
        }${timeAgo.value === 1 ? "" : "s"} ago`}</span>
      );
    } else {
      return <CircularLoading />;
    }
  };

  return (
    <div className="postStatus">
      <div className="postStatus__info">
        <strong>{name ? name : "user"} </strong>
        {renderTimeAgo(timeAgoPosted)}
      </div>
      <img
        className="postStatus__ownerImage"
        alt="post creator"
        src={imgUrl === "" ? Avatar : imgUrl}
      />
    </div>
  );
};

export default PostStatus;
