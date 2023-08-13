import React, { useEffect } from "react";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { usePageToArray } from "../../hooks/usePagesToArray";
import {
  decraseUserPostsPage,
  incraseUserPostsPage,
  setUserPostsPage,
} from "../../redux/features/post/postSlice";
import BooksList from "../booksList/BooksList";
import Pagination from "../pagination/Pagination";
import { getUserPosts } from "../../redux/features/post/postActionCreators";
import CircularLoading from "../loading/CircularLoading";
import ErrorMessage from "../Error/Error";

type PageNumberData = {
  pageNumber: number;
};

const UserPosts: React.FC = () => {
  const { userPosts } = useAppSelectore((state) => state.post);

  const dispatch = useAppDispatch();
  const { pagesArray, totalPages } = usePageToArray({
    postPerPage: userPosts.postPerPage,
    postsCount: userPosts.count,
  });

  // userPosts---------
  const incrasePageHandler = () => {
    if (userPosts.currentPage >= totalPages) return;
    dispatch(incraseUserPostsPage());
  };
  const decrasePageHandler = () => {
    if (userPosts.currentPage <= 1) return;
    dispatch(decraseUserPostsPage());
  };
  const setPageHandler = ({ pageNumber }: PageNumberData) =>
    dispatch(setUserPostsPage(pageNumber));

  useEffect(() => {
    dispatch(
      getUserPosts({
        currentPage: userPosts.currentPage,
        postPerPage: userPosts.postPerPage,
      })
    );
  }, [userPosts.currentPage, dispatch, userPosts.postPerPage]);
  // last dispatch, userPosts.postPerPage

  return (
    <>
      {userPosts.posts.length < 1 &&
        !userPosts.isLoading &&
        !userPosts.error && (
          <h5 style={{ marginTop: "1rem" }}>Create your first post</h5>
        )}
      {userPosts.isLoading && userPosts.posts.length < 1 && <CircularLoading />}
      <BooksList posts={userPosts.posts} isProfile />
      {userPosts.posts.length > 0 && (
        <Pagination
          incrasePageHandler={incrasePageHandler}
          decrasePageHandler={decrasePageHandler}
          setPageHandler={setPageHandler}
          pagesArray={pagesArray}
          currentPage={userPosts.currentPage}
          isLoading={userPosts.isLoading}
        />
      )}
      {userPosts.error && <ErrorMessage errMessage={userPosts.error} />}
    </>
  );
};

export default UserPosts;
