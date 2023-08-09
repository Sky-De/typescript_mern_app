import { useEffect } from "react";
import BooksList from "../../components/booksList/BooksList";
import Pagination from "../../components/pagination/Pagination";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { usePageToArray } from "../../hooks/usePagesToArray";
import { getPostByCount } from "../../redux/features/post/postActionCreators";
import {
  decraseAllPostsPage,
  incraseAllPostsPage,
  setAllPostsPage,
} from "../../redux/features/post/postSlice";

import CircularLoading from "../../components/loading/CircularLoading";
import HomeIntro from "../../components/homeIntro/HomeIntro";
import ErrorMessage from "../../components/Error/Error";
import "./style.scss";

const Home: React.FC = () => {
  const { allPosts } = useAppSelectore((state) => state.post);
  const dispatch = useAppDispatch();

  type PageNumberData = {
    pageNumber: number;
  };

  const { pagesArray, totalPages } = usePageToArray({
    postPerPage: allPosts.postPerPage,
    postsCount: allPosts.count,
  });

  const incraseBookmarksPageHandler = () => {
    if (allPosts.currentPage >= totalPages) return;
    dispatch(incraseAllPostsPage());
  };
  const decraseBookmarksPageHandler = () => {
    if (allPosts.currentPage <= 1) return;
    dispatch(decraseAllPostsPage());
  };
  const setAllPostsPageHandler = ({ pageNumber }: PageNumberData) =>
    dispatch(setAllPostsPage(pageNumber));

  useEffect(() => {
    dispatch(
      getPostByCount({
        postPerPage: allPosts.postPerPage,
        currentPage: allPosts.currentPage,
      })
    );
  }, [allPosts.currentPage, dispatch, allPosts.postPerPage]);
  // last dispatch, allPosts.postPerPage

  return (
    <main className="home">
      {/* -----------------INTRO------------------- */}
      <HomeIntro />
      {/* ----------------LIST-------------------- */}
      <BooksList posts={allPosts.posts} />
      {allPosts.isLoading && allPosts.posts.length === 0 && <CircularLoading />}
      {/* -----------------PAGINATION------------------- */}
      {(allPosts.posts.length >= allPosts.postPerPage ||
        (allPosts.currentPage !== 1 &&
          allPosts.posts.length <= allPosts.postPerPage)) && (
        <Pagination
          decrasePageHandler={decraseBookmarksPageHandler}
          incrasePageHandler={incraseBookmarksPageHandler}
          setPageHandler={setAllPostsPageHandler}
          currentPage={allPosts.currentPage}
          isLoading={allPosts.isLoading}
          pagesArray={pagesArray}
        />
      )}
      {/* -----------------ERROR------------------- */}
      {allPosts.error && <ErrorMessage errMessage={allPosts.error} />}
    </main>
  );
};

export default Home;
