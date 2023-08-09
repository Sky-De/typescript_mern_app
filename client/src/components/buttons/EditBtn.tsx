import { useAppDispatch } from "../../hooks/reduxHooks";
import { openModel } from "../../redux/features/model/modelSlice";
import { Post, setSelectedPost } from "../../redux/features/post/postSlice";

const EditBtn: React.FC<Post> = (props) => {
  const dispatch = useAppDispatch();
  const openEditModelHandler = () => {
    dispatch(setSelectedPost(props));
    dispatch(openModel("POST_EDIT"));
  };

  return (
    <button className="editBtn btn" onClick={openEditModelHandler}>
      <i className="bx bxs-edit"></i>
    </button>
  );
};

export default EditBtn;
