import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { toggleTheme } from "../../redux/features/theme/themeSlice";

const ThemeModeBtn: React.FC = () => {
  const { isDark } = useAppSelectore((state) => state.theme);
  const dispatch = useAppDispatch();
  const toggleThemeHandler = () => dispatch(toggleTheme());
  return (
    <button className="btn themeBtn" onClick={toggleThemeHandler}>
      <i
        className={`bx ${isDark ? "bx-sun" : "bx-moon"}`}
        title="Dark | light"
      ></i>
    </button>
  );
};

export default ThemeModeBtn;
