import { FC } from "react";
import CircularLoading from "../loading/CircularLoading";
import "./style.scss";
import PaginationItem from "./PaginationItem";

//--FIX
type PageNumberData = {
  pageNumber: number;
};

export type PaginationProps = {
  isLoading: boolean;
  currentPage: number;
  pagesArray: number[];
  decrasePageHandler: () => void;
  incrasePageHandler: () => void;
  setPageHandler: ({ pageNumber }: PageNumberData) => void;
};
const Pagination: FC<PaginationProps> = (props) => {
  const {
    isLoading,
    currentPage,
    pagesArray,
    decrasePageHandler,
    incrasePageHandler,
    setPageHandler,
  } = props;

  if (pagesArray.length < 1 && isLoading)
    return <CircularLoading size="small" />;

  return (
    <>
      <div className="pagination">
        <i onClick={decrasePageHandler} className="bx bxs-chevron-left"></i>
        {pagesArray.map((item) => (
          <PaginationItem
            key={item}
            pageNumber={item}
            setPageHandler={setPageHandler}
            currentPage={currentPage}
          />
        ))}
        <i onClick={incrasePageHandler} className="bx bxs-chevron-right"></i>
      </div>
      {isLoading && <CircularLoading size="small" />}
    </>
  );
};

export default Pagination;
