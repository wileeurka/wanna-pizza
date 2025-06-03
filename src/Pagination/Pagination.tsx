import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => props.onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={4}
      forcePage={props.currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
