import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { openModel } from "../../redux/features/model/modelSlice";
import { useEffect, useState } from "react";

const NewPostBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelectore((state) => state.user);

  const [isSetting, setIsSetting] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/profile/setting") setIsSetting(true);
    else setIsSetting(false);
  }, [location]);

  if (isSetting || !user) return <></>;

  const newPostHandler = () => dispatch(openModel("POST_CREATE"));
  return (
    <button onClick={newPostHandler} className="newPostBtn">
      <i className="bx bxs-plus-circle"></i>
    </button>
  );
};

export default NewPostBtn;
