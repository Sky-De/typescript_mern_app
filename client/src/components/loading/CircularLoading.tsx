import "./style.scss";

interface CircularLoadingProps {
  size?: "small" | "medium" | "large";
}

const CircularLoading: React.FC<CircularLoadingProps> = ({
  size = "small",
}) => {
  return (
    <div className="containerStyle">
      <div className={`spinnerStyle ${size}`}></div>
    </div>
  );
};

export default CircularLoading;
