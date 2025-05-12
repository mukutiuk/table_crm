import { useState } from "react";
import {
  searchData,
  addQuote,
  deleteCheckbox,
  changePerPage,
} from "../store/TableSlice";
import EditQuoteModal from "./EditQuoteModal";
import type { QuoteItem } from "../type/type";
import { useAppDispatch, useAppSelector } from "../store/store";
const quoteItemCreate = {
  quote: "",
  date: "",
  customer: "",
  site: "",
  noQuotes: "",
  subTotal: "",
  vat: "",
  total: "",
  deposit: "",
  outstanding: "",
  profit: "",
  email: "",
  description: "",
  id: "",
  checkbox: false,
};
export const TableInteraction = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { itemsPerPage, filteredData } = useAppSelector(
    (state) => state.tableData
  );
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchData(e.target.value));
  };

  const handleSave = (updatedData: QuoteItem) => {
    dispatch(addQuote(updatedData));
  };

  const deleteQutes = () => {
    dispatch(deleteCheckbox());
  };

  const isQuoteforDelete = filteredData.some((item) => item.checkbox);
  const actionQuotes = filteredData.filter((quote) => !quote.checkbox);
  return (
    <div className="flex justify-between max-lg:flex-col">
      <div className="flex flex-wrap gap-[32px]">
        <button className="font-inter w-[109px] h-[34px] bg-[#1D28FF] text-white rounded font-medium text-[14px] leading-[100%] tracking-[0] capitalize">
          Actioned {actionQuotes.length}
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="font-inter w-[42px] h-[34px] bg-[#B5B8FF] rounded text-[14px] leading-[100%] tracking-[0] capitalize"
        >
          Add
        </button>
        <button
          disabled={!isQuoteforDelete}
          onClick={deleteQutes}
          className={`font-inter w-[59px] h-[34px] ${
            !isQuoteforDelete ? "bg-gray-300 " : "bg-[#1D28FF] text-white"
          } rounded text-[14px] leading-[100%] tracking-[0] capitalize`}
        >
          Delete
        </button>
        <button className="font-inter w-[120px] h-[34px] bg-[#B5B8FF] rounded text-[14px] leading-[100%] tracking-[0] capitalize">
          Preview Quotes
        </button>
      </div>
      <div className="flex flex-wrap gap-[30px]">
        <button
          onClick={() => setIsSearch((currentValue) => !currentValue)}
          className="pointer"
        >
          <img src="../public/Component16.svg" alt="icon" />
        </button>
        <form className="w-[115px]">
          <select
            value={itemsPerPage}
            onChange={(e) => dispatch(changePerPage(+e.target.value))}
            className="font-medium text-[14px] capitalize bg-transparent text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5 border-none shadow-none"
          >
            <option
              className="font-inter font-medium text-sm leading-[100%] tracking-normal capitalize"
              value="25"
            >
              Show 25
            </option>
            <option
              className="font-inter font-medium text-sm leading-[100%] tracking-normal capitalize"
              value="10"
            >
              Show 10
            </option>
            <option
              className="font-inter font-medium text-sm leading-[100%] tracking-normal capitalize"
              value="5"
            >
              Show 5
            </option>
            <option
              className="font-inter font-medium text-sm leading-[100%] tracking-normal capitalize"
              value="3"
            >
              Show 3
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
            <button
              onClick={() => setIsSearch((currentValue) => !currentValue)}
            >
              <img
                className="w-6 h-6 absolute right-0 top-[-5px]"
                src="../../public/close-square-svgrepo-com.svg"
                alt=""
              />
            </button>
            <div className="absolute bottom-[-17px] w-[400px] v inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
