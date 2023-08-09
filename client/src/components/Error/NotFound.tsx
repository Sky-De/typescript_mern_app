import NotFoundLightSvg from "../../assets/svg/notFoundLight.svg";
import NotFoundDarkSvg from "../../assets/svg/notFoundDark.svg";
import { useAppSelectore } from "../../hooks/reduxHooks";

const NotFound: React.FC = () => {
  const { isDark } = useAppSelectore((state) => state.theme);
  return (
    <main className="notFound" style={{ placeItems: "center" }}>
      <img
        className="notFound__img"
        width={500}
        src={isDark ? NotFoundDarkSvg : NotFoundLightSvg}
        alt="notFound"
        title="SVG belongs to https://storyset.com/"
      />
    </main>
  );
};

export default NotFound;
