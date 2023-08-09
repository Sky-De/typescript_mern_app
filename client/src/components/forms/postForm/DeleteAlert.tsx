import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import { closeModel } from "../../../redux/features/model/modelSlice";
import { deletePost } from "../../../redux/features/post/postActionCreators";
import ErrorMessage from "../../Error/Error";
import CircularLoading from "../../loading/CircularLoading";

const DeleteAlert: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost, allPosts } = useAppSelectore((state) => state.post);

  const closeModelHandler = () => dispatch(closeModel());
  const deletePostHandler = () => dispatch(deletePost(selectedPost._id));

  return (
    <div className="deletePostAlert">
      <h4>Delete Post</h4>
      <p>You can not undo this action, Are you sure ?</p>
      {allPosts.error && <h2>err</h2>}
      {/* FIX- create btn componets and types with coherent styles */}
      <div className="deletePostAlert__actions">
        <button
          className="deletePostAlert__btn deletePostAlert__btn--cancel"
          onClick={closeModelHandler}
        >
          Cancel
        </button>
        {allPosts.isLoading ? (
          <CircularLoading />
        ) : (
          <button
            className="deletePostAlert__btn deletePostAlert__btn--delete"
            onClick={deletePostHandler}
          >
            Delete
          </button>
        )}
        {allPosts.error && <ErrorMessage errMessage={allPosts.error} />}
      </div>
    </div>
  );
};

export default DeleteAlert;
