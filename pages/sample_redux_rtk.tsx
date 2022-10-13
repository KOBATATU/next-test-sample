import { skipToken } from "@reduxjs/toolkit/dist/query";
import type { UserInfo } from "../components/LoginUser";
import {
  useFetchUserQuery,
  useFetchUsersQuery,
} from "../features/SampleRTKQueryUserInfo";
import { useAppSelector } from "../features/store";
const UserInfoQuery = () => {
  const { data, isLoading, isError } = useFetchUsersQuery();

  return (
    <div>
      {data?.map((userInfo) => (
        <li key={userInfo.id}>{userInfo.email}</li>
      ))}
    </div>
  );
};

export default UserInfoQuery;
