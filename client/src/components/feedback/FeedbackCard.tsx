import { FC } from "react";
import PostStatus from "../postStatus/PostStatus";

type FeedbackCardProps = {
  creatorName: string;
  creatorImgUrl: string;
  createdAt: Date;
  feedback: string;
};

export const FeedbackCard: FC<FeedbackCardProps> = (props) => {
  return (
    <figure className="testimonialCard">
      <blockquote>{props.feedback}</blockquote>
      <figcaption>
        <PostStatus
          createdAt={props.createdAt}
          name={props.creatorName}
          imgUrl={props.creatorImgUrl}
        />
      </figcaption>
    </figure>
  );
};
