import "./style.scss";

interface CircularLoadingProps {
  size?: "small" | "medium" | "large";
  isDark?: boolean;
  isBoth?: boolean;
}

const CircularLoading: React.FC<CircularLoadingProps> = ({
  size = "small",
  isDark = false,
  isBoth = false,
}) => {
  return (
    <div className="containerStyle">
      <div
        className={`spinnerStyle 
          ${size} 
          ${isDark ? "dark" : ""} 
          ${isBoth ? "both" : ""}`}
      ></div>
    </div>
  );
};

export default CircularLoading;
