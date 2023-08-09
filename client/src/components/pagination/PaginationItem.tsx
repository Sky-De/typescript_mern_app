import { useEffect, useState } from "react";

//--FIX
type PageNumberData = {
  pageNumber: number;
};

type Props = {
  pageNumber: number;
  setPageHandler: ({ pageNumber }: PageNumberData) => void;
  currentPage: number;
};

const PaginationItem: React.FC<Props> = ({
  pageNumber,
  currentPage,
  setPageHandler,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (currentPage === pageNumber) setIsActive(true);
    else setIsActive(false);
    //  console.log(currentPage,"currentPage");
    //  console.log(pageNumber,"pageNumber");
  }, [currentPage, pageNumber]);
  // last page numver

  return (
    <button
      name={pageNumber.toString()}
      className={`pagination__item ${isActive ? "active" : ""}`}
      onClick={() => setPageHandler({ pageNumber })}
    >
      {pageNumber}
    </button>
  );
};

export default PaginationItem;
