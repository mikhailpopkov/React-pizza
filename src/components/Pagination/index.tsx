import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss"

type PaginationProps = {
  setCurrentPage: any,
}

const Pagination: React.FC<PaginationProps> = ({setCurrentPage}) => {
      return (
        <>
          <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </>
      );
}

export default Pagination;