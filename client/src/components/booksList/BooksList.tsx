import "./style.scss";
import BookCard from "../bookCard/BookCard";
import { Post } from "../../redux/features/post/postSlice";

type IsProfile = {
  isProfile?: boolean;
};
type Posts = {
  posts: Post[];
};

type BookListProps = Posts & IsProfile;

const BooksList: React.FC<BookListProps> = ({ posts, isProfile }) => {
  return (
    <>
      <ul className="list">
        {posts?.length > 0 &&
          posts?.map((post) => (
            <BookCard key={post._id} {...post} isProfile={isProfile} />
          ))}
      </ul>
    </>
  );
};

export default BooksList;
