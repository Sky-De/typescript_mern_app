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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ msFilter: "" }}
      >
        <path d="M5 20a2 2 0 002 2h10a2 2 0 002-2V8h2V6h-4V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
      </svg>
    </button>
  );
};

export default DeleteBtn;
