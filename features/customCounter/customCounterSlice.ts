import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { executeReducerBuilderCallback } from "@reduxjs/toolkit/dist/mapBuilders";
import axios from "axios";
import { UserInfo } from "../../components/LoginUser";

export interface CounterState {
  value: number;
  status: number;
  username: string;
}

const initialState: CounterState = {
  value: 0,
  status: 0,
  username: "",
};

const sleep = (msec: number) => {
  const start: Date = new Date();
  //@ts-ignore
  while (new Date() - start < msec);
};

const fetchDummy = createAsyncThunk("fetch/dummy", async (num: number) => {
  await sleep(2000);
  return num;
});
export type UserType = {
  username: string;
};

const fetchJSON = createAsyncThunk<UserType, undefined>(
  "fetch/api",
  async () => {
    const res = await axios.get<UserType>(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    return res.data;
  }
);

export const customCounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      switch (state.status) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      switch (state.status) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += action.payload * 100;
          break;
        case 2:
          state.value += action.payload * 10000;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDummy.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.value = 100 + action.payload;
      }
    );
    builder.addCase(fetchDummy.rejected, (state) => {
      state.value -= 100;
    });
    builder.addCase(
      fetchJSON.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.username = action.payload.username;
      }
    );
    builder.addCase(fetchJSON.rejected, (state) => {
      state.username = "anonymous";
    });
  },
});

export const counterActions = {
  fetchJSON,
  fetchDummy,
  ...customCounterSlice.actions,
};

const customCounterReducer = customCounterSlice.reducer;

export default customCounterReducer;
