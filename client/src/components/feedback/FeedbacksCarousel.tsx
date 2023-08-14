import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  getFeedbacks,
  sendFeedback,
} from "../../redux/features/feedback/feedbackActionCreators";

import { openModel } from "../../redux/features/model/modelSlice";
import { activeAlert } from "../../redux/features/alert/alertSlice";
import { resetFeedbackErrors } from "../../redux/features/feedback/feedbackSlice";

import Avatar from "../../assets/icons/avatar.png";
import Input from "../forms/Input";
import SubmitBtn from "../buttons/SubmitBtn";
import CircularLoading from "../loading/CircularLoading";
import ErrorMessage from "../Error/Error";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss";

const FeedbacksCarousel: React.FC = () => {
  const { feedbacks, sendError, sendIsLoading, getIsLoading, getError } =
    useAppSelectore((state) => state.feedback);
  const { user } = useAppSelectore((state) => state.user);
  const { allPosts } = useAppSelectore((state) => state.post);

  const [feedback, setFeedback] = useState<string>("");
  const dispatch = useAppDispatch();

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // add form error state here --FIX
    if (!user) {
      dispatch(
        activeAlert({
          type: "INFO",
          message: "You need login first!",
        })
      );
      dispatch(openModel("AUTH"));
    } else {
      dispatch(sendFeedback({ feedback, creatorId: user?._id }));
      setFeedback("");
    }
  };

  type OnChange =
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement>;

  const changeHander = (e: OnChange): void => {
    setFeedback(e.target.value);
    dispatch(resetFeedbackErrors());
  };

  useEffect(() => {
    dispatch(getFeedbacks());
    console.log("getFeedback render");
  }, []);

  return (
    <section className="feedback">
      <h3 className="feedback__title">Feedbacks</h3>
      {allPosts.posts.length > 0 && (
        <div className="feedback__body">
          {getIsLoading ? (
            <CircularLoading />
          ) : (
            <>
              <Carousel
                swipeable={false}
                showIndicators={false}
                showThumbs={false}
                className="feedback__carousel"
              >
                {feedbacks.map((feedback) => (
                  <figure
                    className="feedback__carousel--item"
                    key={feedback._id}
                  >
                    <img src={feedback.creatorImgUrl || Avatar} alt="avatar" />
                    <blockquote>
                      <span>&#x275D;</span> {feedback.feedback}{" "}
                      <span>&#x275D;</span>
                    </blockquote>
                    <figcaption>
                      <span>{feedback.creatorName} </span>
                      <span>{feedback.createdAt.toString().slice(0, 9)}</span>
                    </figcaption>
                  </figure>
                ))}
              </Carousel>
              {getError && <ErrorMessage errMessage={getError} />}
            </>
          )}
          <form className="feedback__form" onSubmit={submitHandler}>
            <h4 className="feedback__form--title">What do you think ?</h4>
            <Input
              name="let me know"
              type="text-field"
              value={feedback}
              changeHandler={changeHander}
            />
            <SubmitBtn
              isLoading={sendIsLoading}
              tag="send feedback"
              disable={sendIsLoading}
            />
            {sendError && <ErrorMessage errMessage={sendError} />}
          </form>
        </div>
      )}
    </section>
  );
};

export default FeedbacksCarousel;
