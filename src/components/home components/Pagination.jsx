import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, handlePageClick }) {
  return (
    <>
      <ReactPaginate
        forcePage={currentPage - 1}
        breakLabel="..."
        nextLabel=">>>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(totalPages)}
        previousLabel="<<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}

export default Pagination;
