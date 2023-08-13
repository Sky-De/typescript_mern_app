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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ msFilter: "" }}
      >
        <path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-6 2.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM19 15H9v-.25C9 12.901 11.254 11 14 11s5 1.901 5 3.75V15z"></path>
        <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path>
      </svg>
    </button>
  );
};

export default ProfileBtn;
