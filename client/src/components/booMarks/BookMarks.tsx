import { useEffect } from "react";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { usePageToArray } from "../../hooks/usePagesToArray";
import {
  decraseBookMarkPostsPage,
  incraseBookMarkPostsPage,
  setBookMarkPostsPage,
} from "../../redux/features/post/postSlice";
import BooksList from "../booksList/BooksList";
import Pagination from "../pagination/Pagination";
import { getBookMarks } from "../../redux/features/post/postActionCreators";
import CircularLoading from "../loading/CircularLoading";
import ErrorMessage from "../Error/Error";

const BookMarks = () => {
  type PageNumberData = {
    pageNumber: number;
  };
  const { bookMarks } = useAppSelectore((state) => state.post);
  const { user } = useAppSelectore((state) => state.user);
  const dispatch = useAppDispatch();
  const { pagesArray, totalPages } = usePageToArray({
    postPerPage: bookMarks.postPerPage,
    postsCount: bookMarks.count,
  });

  // userPosts
  const incrasePageHandler = () => {
    if (bookMarks.currentPage >= totalPages) return;
    dispatch(incraseBookMarkPostsPage());
  };
  const decrasePageHandler = () => {
    if (bookMarks.currentPage <= 1) return;
    dispatch(decraseBookMarkPostsPage());
  };
  const setPageHandler = ({ pageNumber }: PageNumberData) =>
    dispatch(setBookMarkPostsPage(pageNumber));

  useEffect(() => {
    dispatch(
      getBookMarks({
        currentPage: bookMarks.currentPage,
        postPerPage: bookMarks.postPerPage,
      })
    );
  }, [bookMarks.currentPage, user?.bookMarks, bookMarks.postPerPage, dispatch]);
  // last

  return (
    <>
      {bookMarks.posts.length < 1 &&
        !bookMarks.isLoading &&
        !bookMarks.error && (
          <h5 style={{ marginTop: "1rem" }}>There is no bookmarks yet!</h5>
        )}
      {bookMarks.isLoading && bookMarks.posts.length < 1 && <CircularLoading />}
      <BooksList posts={bookMarks.posts} isProfile />
      {bookMarks.posts.length > 0 && (
        <Pagination
          incrasePageHandler={incrasePageHandler}
          decrasePageHandler={decrasePageHandler}
          setPageHandler={setPageHandler}
          pagesArray={pagesArray}
          currentPage={bookMarks.currentPage}
          isLoading={bookMarks.isLoading}
        />
      )}
      {bookMarks.error && <ErrorMessage errMessage={bookMarks.error} />}
    </>
  );
};

export default BookMarks;
