import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "../components/LoginUser";

// ReduxのUserInfoのSliceの型
export type UserInfoSlice = {
  isLoading: boolean; // fetch中かどうか
  data: UserInfo | null; // 取得したデータ
  isError: boolean; // リクエストがエラーかどうか
};

const fetchUser = createAsyncThunk("users/getUsers", async () =>
  axios
    .get<UserInfo>("https://jsonplaceholder.typicode.com/users/1")
    .then((res) => {
      return res.data;
    })
);

const userInfoSlice = createSlice({
  name: "userFetch",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  } as UserInfoSlice,
  reducers: {
    clean: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //読み込み中
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//globalで使うことができるreducer
export const userInfoReducer = userInfoSlice.reducer;

//fetchUserとreducersで定義した関数をexport
export const userInfoActions = { fetchUser, ...userInfoSlice.actions };
