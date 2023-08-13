import Details from "./Details";
import IntroCover from "../../assets/svg/BookLover.svg";
import "./style.scss";

const REPOSITORY_URL = "https://github.com/Sky-De/typescript_mern_app";

const data = [
  // FIX--- clean package and fix this
  {
    id: 1,
    title: "Front End",
    techs: [
      ["@reduxjs/toolkit", "^1.9.5"],
      ["@testing-library/jest-dom", "^5.16.5"],
      ["@testing-library/react", "^13.4.0"],
      ["@testing-library/user-event", "^13.5.0"],
      ["@types/jest", "^27.5.2"],
      ["@types/node", "^16.18.36"],
      ["@types/react", "^18.2.14"],
      ["@types/react-dom", "^18.2.6"],
      ["axios", "^1.4.0"],
      ["cloudinary", "^1.37.3"],
      ["react", "^18.2.0"],
      ["react-dom", "^18.2.0"],
      ["react-redux", "^8.1.1"],
      ["react-router-dom", "^6.14.1"],
      ["react-scripts, 5.0.1"],
      ["react-slick", "^0.29.0"],
      ["sass", "^1.63.6"],
      ["typescript", "^4.9.5"],
      ["web-vitals", "^2.1.4"],
    ],
  },
  {
    id: 2,
    title: "Back End",
    techs: [
      ["bcrypt ", "^5.1.0"],
      ["body-parser ", "^1.20.2"],
      ["cookie-parser  ", "^1.4.6"],
      ["cors ", "^2.8.5"],
      ["dotenv ", "^16.3.1"],
      ["express ", "^4.18.2"],
      ["jsonwebtoken ", "^9.0.0"],
      ["mailgen ", "^2.0.27"],
      ["mongoose ", "^7.3.1"],
      ["nodemailer ", "^7.3.1"],
      ["npm ", "^6.9.4"],
    ],
  },
];

const HomeIntro = () => {
  return (
    <section className="homeIntro" role="banner" aria-label="home intro">
      <img
        className="homeIntro__img"
        src={IntroCover}
        alt="Home intro"
        title="SVG belongs to https://storyset.com/"
      />
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
        {/* FIX  replace lorem*/}
        <p>
          Discover my React MEARN app ( client TypeScript / server JavaScript )
          - CRUD operations, user auth, and posts management. Enjoy real-time
          updates and robust type checking for code reliability. Unleash the
          potential of MongoDB, Express, React, Node.js, Redux, and TypeScript.
          Build interactive, responsive user interfaces with ease.
        </p>
        <ul className="homeIntro__content--techList">
          {data.map((item) => (
            <Details key={item.id} title={item.title} techs={item.techs} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HomeIntro;
