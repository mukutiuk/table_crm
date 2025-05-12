import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { QuoteItem } from "../type/type";

export interface TableDataState {
  data: QuoteItem[];
  loading: boolean;
  error: string | null;
  dataInput: string;
  filteredData: QuoteItem[];
  switchModal: boolean;
  itemsPerPage: number;
}

const initialState: TableDataState = {
  data: [],
  loading: false,
  error: null,
  dataInput: "",
  filteredData: [],
  switchModal: false,
  itemsPerPage: 25,
};

export const fetchTableData = createAsyncThunk(
  "tableData/fetchTableData",
  async () => {
    const response = await fetch("./db.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  }
);

export const TableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.dataInput = action.payload.toLowerCase();

      state.filteredData = state.data.filter(
        (item) =>
          item.quote.toLowerCase().includes(state.dataInput) ||
          item.customer.toLowerCase().includes(state.dataInput) ||
          item.site.toLowerCase().includes(state.dataInput) ||
          item.date.toLowerCase().includes(state.dataInput) ||
          item.total.toLowerCase().includes(state.dataInput) ||
          item.deposit.toLowerCase().includes(state.dataInput) ||
          item.outstanding.toLowerCase().includes(state.dataInput) ||
          item.profit.toLowerCase().includes(state.dataInput) ||
          item.email.toLowerCase().includes(state.dataInput) ||
          item.deposit.toLowerCase().includes(state.dataInput)
      );
    },
    changeCheckbox: (state, action) => {
      return {
        ...state,
        filteredData: state.filteredData.map((item) => {
          if (item.id === action.payload) {
            return { ...item, checkbox: !item.checkbox };
          }

          return item;
        }),
      };
    },
    changePerPage: (state, action) => {
      return {
        ...state,
        itemsPerPage: action.payload,
      };
    },
    deleteCheckbox: (state) => {
      return {
        ...state,
        filteredData: state.filteredData.filter((item) => !item.checkbox),
      };
    },
    addQuote: (state, action) => {
      state.filteredData.push(action.payload);
      state.data.push(action.payload);
    },
    editQuote: (state, action) => {
      return {
        ...state,
        filteredData: state.filteredData.map((item) => {
          if (action.payload.id === item.id) {
            return action.payload;
          }
          return item;
        }),
      };
    },
    handleSwitchModal: (state) => {
      return {
        ...state,
        switchModal: !state.switchModal,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    });
  },
});

export default TableDataSlice.reducer;
export const {
  searchData,
  handleSwitchModal,
  addQuote,
  changeCheckbox,
  deleteCheckbox,
  editQuote,
  changePerPage,
} = TableDataSlice.actions;
