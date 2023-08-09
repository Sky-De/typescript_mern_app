import { useEffect, useState } from "react";

interface UsePageToArrayProps {
  postsCount: number;
  postPerPage: number;
}

type RetrunType = {
  pagesArray: number[];
  totalPages: number;
};

export const usePageToArray = ({
  postsCount,
  postPerPage,
}: UsePageToArrayProps): RetrunType => {
  const [pagesArray, setPagesArray] = useState<number[]>([]);

  const totalPages = Math.ceil(postsCount / postPerPage);

  useEffect(() => {
    const newPagesArray = [];
    for (let i = 1; i <= totalPages; i++) {
      newPagesArray.push(i);
    }
    setPagesArray(newPagesArray);
  }, [totalPages]);

  return { pagesArray, totalPages };
};
