import ProfileBtn from "../../components/buttons/ProfileBtn";
import ThemeModeBtn from "../../components/buttons/ThemeModeBtn";
import AuthBtn from "../../components/buttons/AuthBtn";
import LogoBtn from "../../components/buttons/LogoBtn";
import { useAppSelectore } from "../../hooks/reduxHooks";
import "./style.scss";

const Header: React.FC = () => {
  const { user } = useAppSelectore((state) => state.user);

  return (
    <header className="header">
      <div className="header__content">
        <LogoBtn />
        <div className="header__actions">
          {user && <ProfileBtn />}
          <ThemeModeBtn />
          <AuthBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
