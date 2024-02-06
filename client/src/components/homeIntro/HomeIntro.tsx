import "./style.scss";
import IntroCover from "../../assets/svg/BookLover.svg";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { openModel } from "../../redux/features/model/modelSlice";

const REPOSITORY_URL = "https://github.com/Sky-De/typescript_mern_app";

const HomeIntro = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="homeIntro" role="banner" aria-label="home intro">
      <div className="homeIntro__imgCon">
        <img
          className="homeIntro__img"
          src={IntroCover}
          alt="Home intro"
          title="SVG belongs to https://storyset.com/"
        />
      </div>
      <div className="homeIntro__content">
        <h2 className="homeIntro__content--title">MERN APPLICATION</h2>
        <a
          href={REPOSITORY_URL}
          target="_blank"
          rel="noreferrer"
          className="homeIntro__sourceCode"
        >
          <span>Github source code link</span>
          <i className="bx bxl-github footer__link--icon"></i>
        </a>
        <p>
          Discover my React MEARN app ( client TypeScript / server JavaScript )
          - CRUD operations, user auth, and posts management. Enjoy real-time
          updates and robust type checking for code reliability. Unleash the
          potential of MongoDB, Express, React, Node.js, Redux, and TypeScript.
          Build interactive, responsive user interfaces with ease.
        </p>
        <ul className="homeIntro__content--techList">
          <li
            className="techItem__title"
            onClick={() => dispatch(openModel("FRONT_END"))}
          >
            # FrontEnd
          </li>
          <li
            className="techItem__title"
            onClick={() => dispatch(openModel("BACK_END"))}
          >
            # BackEnd
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomeIntro;
