import { NavLink } from "react-router-dom";
import "./style.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h3>SkyDe</h3>
      <NavLink
        className="footer__link btn"
        target="_blank"
        to="https://www.linkedin.com/in/sky-de-763248228"
        children={<i className="bx bxl-linkedin-square footer__link--icon"></i>}
      />
      <NavLink
        className="footer__link btn"
        target="_blank"
        to="https://github.com/Sky-De"
        children={<i className="bx bxl-github footer__link--icon"></i>}
      />
      <NavLink
        className="footer__link btn"
        target="_blank"
        to="https://twitter.com/SkyDe1991?t=b2SJxGA4wmHwwgxDUUtE8Q&s=09"
        children={<i className="bx bxl-twitter footer__link--icon"></i>}
      />
      <a
        className="footer__link btn"
        target="_blank"
        rel="noreferrer"
        href="mailto:sky_de1991@outlook.com"
        children={<i className="bx bxl-google footer__link--icon"></i>}
      />
    </footer>
  );
};

export default Footer;
