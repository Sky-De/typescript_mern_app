import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import "./style.scss";
import { openModel } from "../../redux/features/model/modelSlice";
const ProfileBtn: React.FC = () => {
  const { user } = useAppSelectore((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToProfileHandler = () => {
    if (!user) return dispatch(openModel("AUTH"));
    navigate("/profile");
  };

  return (
    <button className="btn profileBtn" onClick={goToProfileHandler}>
      <i
        className={`bx bxs-user-account ${!user && "disable"}`}
        title="profile"
      ></i>
    </button>
  );
};

export default ProfileBtn;
