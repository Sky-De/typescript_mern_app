import { useAppDispatch } from "../../hooks/reduxHooks";
import { openModel } from "../../redux/features/model/modelSlice";
import { Post, setSelectedPost } from "../../redux/features/post/postSlice";

const DeleteBtn: React.FC<Post> = (props) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(setSelectedPost(props));
    dispatch(openModel("POST_DELETE"));
  };
  return (
    <button className="btn deleteBtn" onClick={handleDelete}>
      <i className="bx bx-trash"></i>
    </button>
  );
};

export default DeleteBtn;
