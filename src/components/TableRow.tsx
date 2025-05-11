import React, {useState} from "react";
import {type QuoteItem} from "../type/type";
import EditQuoteModal from "./EditQuoteModal";
import { useAppDispatch } from "../utils/hooks";
import { changeCheckbox } from "../features/TableSlice";

type Props = {
  row: QuoteItem;
  index: number;
};

export const TableRow: React.FC<Props> = ({row, index}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quoteData, setQuoteData] = useState<QuoteItem>(row);
    const dispatch = useAppDispatch();

  const handleSave = (updatedData: QuoteItem) => {
    setQuoteData(updatedData);
  };

  const handleChangeCheckbox = (id: number | string) => {
    dispatch(changeCheckbox(id))
  }

  return (
    <>
      <tr
        className={`border-b h-[102px] p-4 ${
          index % 2 === 0 ? "bg-white" : "bg-gray-100"
        }`}
      >
        <td className="p-2 pl-[12px] text-center font-semibold text-lg leading-[100%] tracking-normal capitalize">
          <div className="flex items-center justify-center gap-2">
            <input
              onChange={() => handleChangeCheckbox(row.id)}
              type="checkbox"
            />
            {index + 1}.
          </div>
        </td>

        <td className="p-2 w-[150px] text-sm">{quoteData.quote}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.date}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.customer}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.site}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.noQuotes}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.subTotal}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.vat}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.total}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.deposit}</td>
        <td className="p-2 w-[150px] text-sm">{quoteData.outstanding}</td>
        <td className="p-2 text-sm">{quoteData.profit}</td>
        <td className="p-2 text-sm">{quoteData.email}</td>
        <td className="p-2 w-[148px] text-start text-sm">
          {quoteData.description}
        </td>

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
        </td>
      </tr>
      <div>
        {isModalOpen && (
          <EditQuoteModal
            setIsModalOpen={setIsModalOpen}
            data={quoteData}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );
};
