import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import counterReducer, { counterSlice } from "./CounterSlice";
import customCounterReducer from "./customCounter/customCounterSlice";
import { userApi } from "./SampleRTKQueryUserInfo";
import { userInfoReducer } from "./SampleToolKitUserInfo";

//利用するreducerをここに全て定義する
export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    counter: counterReducer,
    [userApi.reducerPath]: userApi.reducer,
    customCounter: customCounterReducer,
  },
  //RTKQueryの場合以下を書く必要がある。
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

//おまじない
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//今回作成しdDisPatchの型をつける
// const dispatch = useDispatch() というやり方でも参照可能であるが１つ１つに型をつける必要がある。
export const useAppDispatch = () => useDispatch<AppDispatch>();
//const customCounterSelector = useAppSelector((state) => state.customCounter); という参照でsliceで定義したstateを参照できる
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//https://qiita.com/7tsuno/items/2301a35283db7cd54df9
