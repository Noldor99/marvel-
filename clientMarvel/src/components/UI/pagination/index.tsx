import React from "react";
import ReactPaginate from "react-paginate";

import css from "./Pagination.module.sass";

type TPaginationProps = {
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
  small?: boolean
};

export const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  totalPage,
  onChangePage,
  small
}) => (
  <ReactPaginate

    className={`${css.root} ${small && css.small}`}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={totalPage}
    forcePage={currentPage - 1}
  />
);
