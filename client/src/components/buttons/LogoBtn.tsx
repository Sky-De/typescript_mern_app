import { useNavigate } from "react-router-dom";

const LogoBtn: React.FC = () => {
  const navigate = useNavigate();
  const goHomeHandler = () => navigate("/");
  return (
    <button title="Home" className="btn logoBtn" onClick={goHomeHandler}>
      <i className="bx bx-book-alt"></i>
      <h1>BookShare</h1>
    </button>
  );
};

export default LogoBtn;
