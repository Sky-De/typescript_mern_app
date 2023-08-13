import { useAppSelectore } from "../../hooks/reduxHooks";
import { FC } from "react";
import BookCard from "../bookCard/BookCard";

const BookDetails: FC = () => {
  const { selectedPost } = useAppSelectore((state) => state.post);

  return (
    <article>
      <BookCard {...selectedPost} />
    </article>
  );
};

export default BookDetails;
