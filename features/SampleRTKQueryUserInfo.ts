import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserInfo } from "../components/LoginUser";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/users/",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchUser: builder.query<UserInfo, string>({
      query: (id: string) => ({
        url: `${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    fetchUsers: builder.query<Array<UserInfo>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});
export const { useFetchUserQuery, useFetchUsersQuery } = userApi;

//https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
//provides tags
