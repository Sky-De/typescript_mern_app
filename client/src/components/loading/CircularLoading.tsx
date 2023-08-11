import "./style.scss";

interface CircularLoadingProps {
  size?: "small" | "medium" | "large";
  isDark?: boolean;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({
  size = "small",
  isDark = false,
}) => {
  return (
    <div className="containerStyle">
      <div className={`spinnerStyle ${size} ${isDark ? "dark" : ""}`}></div>
    </div>
  );
};

export default CircularLoading;
