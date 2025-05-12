import { useAppSelector } from "../store/store";
type Props = {
  changePage: (page: number) => void;
  currentPage: number;
};
export const PaginationWithPageSizeSelector: React.FC<Props> = ({
  changePage,
  currentPage,
}) => {
  const { filteredData, itemsPerPage } = useAppSelector(
    (state) => state.tableData
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      changePage(page);
    }
  };

  const renderPages = () => {
    const arr: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (currentPage > 3) arr.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) arr.push(i);
      if (currentPage < totalPages - 2) arr.push("...");
      arr.push(totalPages);
    }
    return arr;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 mb-6">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-2xl px-2 disabled:opacity-30"
        >
          &lt;
        </button>
        {renderPages().map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2 text-xl">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => handlePageClick(Number(page))}
              className={`text-xl px-2 ${
                page === currentPage ? "font-bold" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-2xl px-2 disabled:opacity-30"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
