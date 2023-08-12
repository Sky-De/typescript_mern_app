import "./style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FeedbackCard } from "./FeedbackCard";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { getFeedbacks } from "../../redux/features/feedback/feedbackActionCreators";
import Avatar from "../../assets/icons/avatar.png";
import PostStatus from "../postStatus/PostStatus";

const FeedbacksSlider: React.FC = () => {
  const { feedbacks } = useAppSelectore((state) => state.feedback);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeedbacks());
    console.log(feedbacks, "frrfd");
  }, []);

  return (
    <section className="feedbacks">
      <hr style={{ margin: "3rem 0" }} />
      <h3 className="feedbacks__title">Feedbacks</h3>
      <Carousel showThumbs={false} className="feedbacks__slider">
        {feedbacks.map((feedback) => (
          <figure className="feedbacks__slider--item">
            <img src={feedback.creatorImgUrl || Avatar} alt="avatar" />
            <blockquote>
              <span>&#x275D;</span> {feedback.feedback} <span>&#x275D;</span>
            </blockquote>
            <figcaption>
              <p>{feedback.creatorName} </p>
              <p>{feedback.createdAt.toString().slice(0, 9)}</p>
            </figcaption>
          </figure>
        ))}
      </Carousel>
    </section>
  );
};

export default FeedbacksSlider;
