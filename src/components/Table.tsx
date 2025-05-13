import { useEffect } from "react";
import { TableRow } from "./TableRow";
import { fetchTableData } from "../store/TableSlice";
import { useAppDispatch } from "../store/store";
import { PaginationWithPageSizeSelector } from "./Pagination";
import usePagination from "../hooks/usePagination";

const TABLE_HEADER = [
  "№",
  "Quote",
  "Date",
  "Customer",
  "Site/Delivery",
  "No. Quotes",
  "Sub Total",
  "VAT",
  "Total",
  "Deposit",
  "Outstanding",
  "Profit",
  "Email",
  "Description",
  "Customer Job Ref",
];

export const Table = () => {
  const dispatch = useAppDispatch();
  const { paginatedData, changePage, currentPage } = usePagination();

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  return (
    <>
      {paginatedData.length === 0 ? (
        <h1 className="text-center font-inter font-bold">
          There are no quotes matching these parameters.
        </h1>
      ) : (
        <>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left table-fixed">
              <thead>
                <tr className="bg-gray-200 border-b">
                  {TABLE_HEADER.map((heading, i) => (
                    <th
                      key={i}
                      className={`p-2 font-inter font-medium text-base leading-[100%] tracking-normal capitalize ${
                        heading === "Description" ? "w-[120px] align-top" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <TableRow row={row} index={index} key={row.id} />
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-200 font-semibold border-t">
                  <td
                    className="p-2 text-left font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize"
                    colSpan={6}
                  >
                    Page Sub Total:
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £18,401.90
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £3,680.40
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £22,082.30
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £0.00
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £22,082.30
                  </td>
                  <td className="p-2 font-inter font-medium text-[18px] leading-[100%] tracking-normal capitalize">
                    £18,401.90
                  </td>
                  <td colSpan={3} className="p-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex justify-center">
            <PaginationWithPageSizeSelector
              currentPage={currentPage}
              changePage={changePage}
            />
          </div>
        </>
      )}
    </>
  );
};
