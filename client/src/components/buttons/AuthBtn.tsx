import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { openModel } from "../../redux/features/model/modelSlice";

const AuthBtn: React.FC = () => {
  const { user } = useAppSelectore((state) => state.user);
  const dispatch = useAppDispatch();
  const openAuthHandler = () => dispatch(openModel("AUTH"));

  return (
    <button className="btn authBtn" onClick={openAuthHandler}>
      <i
        className={`bx ${user ? "bx-log-out" : "bx-log-in"}`}
        title={user ? "LogOut" : "LogIn"}
      ></i>
    </button>
  );
};

export default AuthBtn;
