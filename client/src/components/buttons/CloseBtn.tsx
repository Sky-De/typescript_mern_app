import { useCloseCleanModel } from "../../hooks/useCloseCleanModel";

const CloseBtn: React.FC = () => {
  const cleanCloseModel = useCloseCleanModel();
  const closeModelHandler = () => cleanCloseModel();

  return (
    <button className="btn closeBtn" onClick={closeModelHandler}>
      <i>x</i>
    </button>
  );
};

export default CloseBtn;
