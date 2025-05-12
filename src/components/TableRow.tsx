import React, { useState } from "react";
import { type QuoteItem } from "../type/type";
import EditQuoteModal from "./EditQuoteModal";
import { changeCheckbox, editQuote } from "../store/TableSlice";
import { useAppDispatch } from "../store/store";

type Props = {
  row: QuoteItem;
  index: number;
};

export const TableRow: React.FC<Props> = ({ row: quote, index }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSave = (updatedData: QuoteItem) => {
    dispatch(editQuote(updatedData));
  };

  const handleChangeCheckbox = (id: number | string) => {
    dispatch(changeCheckbox(id));
  };

  return (
    <>
      <tr
        className={`border-b h-[102px] p-4 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        }`}
      >
        <td className="p-2 pl-3 text-center font-semibold text-lg leading-[100%] tracking-normal capitalize">
          <div className="flex items-center justify-center gap-2">
            <input
              onChange={() => handleChangeCheckbox(quote.id)}
              type="checkbox"
            />
            {index + 1}
          </div>
        </td>

        <td className="p-2  text-sm min-w-[110px]">{quote.quote}</td>
        <td className="p-2  text-sm ">{quote.date}</td>
        <td className="p-2  text-sm">{quote.customer}</td>
        <td className="p-2  text-sm">{quote.site}</td>
        <td className="p-2  text-sm">{quote.noQuotes}</td>
        <td className="p-2  text-sm">{quote.subTotal}</td>
        <td className="p-2  text-sm">{quote.outstanding}</td>
        <td className="p-2  text-sm">{quote.vat}</td>
        <td className="p-2  text-sm">{quote.total}</td>
        <td className="p-2  text-sm">{quote.deposit}</td>
        <td className="p-2 text-sm">{quote.profit}</td>
        <td className="p-2 text-sm">{quote.email}</td>
        <td className="p-2 min-w-[158px] text-sm">{quote.description}</td>

        <td className="p-2 w-[150px]">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 hover:underline p-2 flex justify-end"
            >
              <img
                className="w-[24px] h-[24px]"
                src="public/Pencil.svg"
                alt="Edit"
              />
            </button>
          </div>
          <div>
            {isModalOpen && (
              <EditQuoteModal
                setIsModalOpen={setIsModalOpen}
                data={quote}
                onSave={handleSave}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
