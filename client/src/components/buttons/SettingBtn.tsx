import { useNavigate } from "react-router-dom";
import { useAppSelectore } from "../../hooks/reduxHooks";

const SettingBtn: React.FC = () => {
  const { user } = useAppSelectore((state) => state.user);
  const navigate = useNavigate();
  const goToSettingHandler = () => {
    if (!user) return navigate("/");
    navigate("/profile/setting");
  };
  return (
    <button
      title="setting"
      onClick={goToSettingHandler}
      className="btn settingBtn"
    >
      <i className="bx bx-cog"></i>
      <p>setting</p>
    </button>
  );
};

export default SettingBtn;
