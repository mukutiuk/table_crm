import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { TableRow } from "./TableRow";
import { fetchTableData } from "../features/TableSlice";

export const Table = () => {
    const dispatch = useAppDispatch();
    const { filteredData  } = useAppSelector((state) => state.tableData);

    console.log(filteredData.filter(i => i.checkbox));
    useEffect(() => {
      dispatch(fetchTableData());
    }, [dispatch]);

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm text-left table-fixed">
        <thead>
          <tr className="bg-gray-200 border-b">
            {[
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
            ].map((heading, i) => (
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
          {filteredData.map((row, index) => (
            <TableRow row={row} index={index} key={row.id}/>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-semibold border-t">
            <td className="p-2 text-right" colSpan={6}>
              Page Sub Total:
            </td>
            <td className="p-2">£18,401.90</td>
            <td className="p-2">£3,680.40</td>
            <td className="p-2">£22,082.30</td>
            <td className="p-2">£0.00</td>
            <td className="p-2">£22,082.30</td>
            <td className="p-2">£18,401.90</td>
            <td colSpan={3} className="p-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
