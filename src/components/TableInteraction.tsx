import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { searchData, addQuote, deleteCheckbox } from "../features/TableSlice";
import EditQuoteModal from "./EditQuoteModal";
import type { QuoteItem } from "../type/type";
const quoteItemCreate = {
  quote: '',
  date: '',
  customer: '',
  site: '',
  noQuotes: '',
  subTotal: '',
  vat: '',
  total: '',
  deposit: '',
  outstanding: '',
  profit: '',
  email: '',
  description: '',
  id: '',
  checkbox: false,
}
export const TableInteraction = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { filteredData } = useAppSelector((state) => state.tableData);

  console.log(filteredData);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchData(e.target.value));
  };

  const handleSave = (updatedData: QuoteItem) => {
    dispatch(addQuote(updatedData));
    console.log("Updated Data: ", updatedData);
  };

  const deleteQutes = () => {
    dispatch(deleteCheckbox());

  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-[32px]">
        <button className="font-inter w-[109px] h-[34px] bg-[#1D28FF] text-white rounded font-medium text-[14px] leading-[100%] tracking-[0] capitalize">
          Actioned 20
        </button>
        <button onClick={() => setIsModalOpen(true)} className="font-inter w-[42px] h-[34px] bg-[#B5B8FF] rounded text-[14px] leading-[100%] tracking-[0] capitalize">
          Add
        </button>
        <button onClick={deleteQutes} className="font-inter w-[59px] h-[34px] bg-[#B5B8FF] rounded text-[14px] leading-[100%] tracking-[0] capitalize">
          Delete
        </button>
        <button className="font-inter w-[120px] h-[34px] bg-[#B5B8FF] rounded text-[14px] leading-[100%] tracking-[0] capitalize">
          Preview Quotes
        </button>
      </div>
      <div className="flex gap-[30px]">
        <button
          onClick={() => setIsSearch((currentValue) => !currentValue)}
          className="pointer"
        >
          <img src="../public/Component16.svg" alt="icon" />
        </button>
        <form className="max-w-sm mx-auto w-[115px]">
          <select
            id="countries"
            className="font-medium text-[14px] leading-[100%] tracking-[0] capitalize bg-transparent text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5 dark:bg-transparent dark:placeholder-gray-400 dark:text-white border-none shadow-none"
          >
            <option
              className="font-inter font-medium text-[14px] leading-[100%] tracking-[0] capitalize"
              selected
            >
              Show 50
            </option>
            <option className="font-inter" value="US">
              United States
            </option>
            <option className="font-inter" value="CA">
              Canada
            </option>
            <option className="font-inter" value="FR">
              France
            </option>
            <option className="font-inter" value="DE">
              Germany
            </option>
          </select>
        </form>
        <button className="font-inter font-medium text-[14px] leading-[100%] tracking-[0] capitalize">
          Print
        </button>
        <button className="font-inter font-medium text-[14px] leading-[100%] tracking-[0] capitalize">
          Export
        </button>
      </div>
      {isSearch && (
        <div className="fixed top-[50px] left-[50%] max-w-[600px] transform -translate-x-1/2 p-4 bg-white">
          <div className="relative ">
            <div className="absolute w-[400px] v inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleSearchChange}
              type="search"
              id="default-search"
              className="block w-[400px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditQuoteModal
          setIsModalOpen={setIsModalOpen}
          data={quoteItemCreate}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
