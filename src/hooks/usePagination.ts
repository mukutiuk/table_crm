import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { changePerPage } from "../store/TableSlice";

const usePagination = () => {
  const { filteredData, itemsPerPage } = useAppSelector(
    (state) => state.tableData
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, itemsPerPage]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const changeItemsPerPage = (count: number) => {
    dispatch(changePerPage(count));
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    changePage,
    itemsPerPage,
    changeItemsPerPage,
  };
};

export default usePagination;
