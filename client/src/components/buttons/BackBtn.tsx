import { Link } from "react-router-dom";
type Props = {
  path: string;
};
const BackBtn: React.FC<Props> = (props) => {
  return (
    <Link to={props.path} className="btn backBtn">
      <i className="bx bx-arrow-back"></i>
      <span>Back</span>
    </Link>
  );
};

export default BackBtn;
