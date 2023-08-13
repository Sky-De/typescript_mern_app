import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import ErrorMessage from "../Error/Error";
import {
  getVerifyEmail,
  verifyUser,
} from "../../redux/features/user/userActionCreators";
import CircularLoading from "../loading/CircularLoading";
import "./style.scss";
import { resetUserError } from "../../redux/features/user/userSlice";

const VerifyUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelectore((state) => state.user);
  const [formData, setFormData] = useState<string>("");

  useEffect(() => {
    dispatch(resetUserError());
  }, [dispatch]);
  // last dispatch

  // limit for sending email
  const SEND_MAIL_LIMIT_TIME = 59;
  const [timer, setTimer] = useState(SEND_MAIL_LIMIT_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setTimer(SEND_MAIL_LIMIT_TIME);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, isTimerRunning]);

  const handleSendMail = () => {
    if (user) dispatch(getVerifyEmail(user._id));
    setIsTimerRunning(true);
    setTimer(SEND_MAIL_LIMIT_TIME);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetUserError());
    const value = e.target.value;
    if (value.length < 5) setFormData(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    user &&
      dispatch(verifyUser({ id: user?._id, verifyCode: Number(formData) }));
  };

  return (
    <form className="verifyUser" onSubmit={handleSubmit}>
      <h4>Verify Email</h4>
      <input
        className="verifyUser__input"
        value={formData}
        placeholder=" * * * *"
        type="number"
        onChange={changeHandler}
      />
      {/* submit btn */}
      <button
        className="verifyUser__btn"
        disabled={isTimerRunning}
        type="button"
        onClick={handleSendMail}
      >
        {isLoading ? (
          <CircularLoading isDark={true} />
        ) : isTimerRunning ? (
          timer
        ) : (
          "send mail"
        )}
      </button>
      <button
        className="verifyUser__btn confirm"
        disabled={formData.length < 4}
        type="submit"
      >
        {isLoading ? <CircularLoading isDark={true} /> : "confirm"}
      </button>
      <div className="verifyUser__errorCon">
        {error && <ErrorMessage errMessage={error} />}
      </div>
    </form>
  );
};

export default VerifyUser;
