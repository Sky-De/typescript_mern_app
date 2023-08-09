import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import { logoutUser } from "../../../redux/features/user/userActionCreators";
import CircularLoading from "../../loading/CircularLoading";
import { useCloseCleanModel } from "../../../hooks/useCloseCleanModel";

const LogoutFrom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelectore((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const closeCleanModel = useCloseCleanModel();
  const closeModelHandler = () => closeCleanModel();

  return (
    <div className="logoutForm">
      <h4>LogOut</h4>
      <p>Are you sure ?</p>
      <div className="logoutForm__actions">
        <button
          className="logoutForm__btn logoutForm__btn--cancel"
          onClick={closeModelHandler}
        >
          Cancel
        </button>
        {isLoading ? (
          <CircularLoading />
        ) : (
          <button
            className="logoutForm__btn logoutForm__btn--logout"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default LogoutFrom;
