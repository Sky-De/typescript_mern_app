import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import { deleteUser } from "../../../redux/features/user/userActionCreators";
import CircularLoading from "../../loading/CircularLoading";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { resetUserError } from "../../../redux/features/user/userSlice";
import { useCloseCleanModel } from "../../../hooks/useCloseCleanModel";
import ErrorMessage from "../../Error/Error";

const DeleteAccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error: userError,
    user,
  } = useAppSelectore((state) => state.user);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);
  // last navigate

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const closeCleaneModel = useCloseCleanModel();

  const boxChangeHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setIsChecked(e.target.checked);

  const closeModelHandler = () => closeCleaneModel();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetUserError());
    if (user) dispatch(deleteUser({ id: user._id }));
  };

  return (
    <form className="deleteForm" onSubmit={submitHandler}>
      <h4>Delete account</h4>
      <p>
        This process will remove all your data from data base, you'll not have
        any access to your account anymore !
      </p>
      <div className="deleteForm__inputControl">
        <input
          onChange={boxChangeHandler}
          className="deleteForm__input"
          type="checkbox"
          name="box"
        />
        <label htmlFor="box">Yes, i'm SURE !!</label>
      </div>
      <div className="deleteForm__actions">
        <button
          className="deleteForm__btn deleteForm__btn--cancel"
          onClick={closeModelHandler}
        >
          Cancel
        </button>
        <button
          // disabled={!isChecked}
          className={`deleteForm__btn deleteForm__btn--delete ${
            isChecked ? "active" : ""
          }`}
          type="submit"
        >
          DELETE MY ACCOUNT
        </button>
      </div>
      {isLoading && <CircularLoading />}
      {userError && <ErrorMessage errMessage={userError} />}
    </form>
  );
};

export default DeleteAccountForm;
