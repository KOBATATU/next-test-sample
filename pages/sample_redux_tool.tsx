import { useEffect } from "react";
import { userInfoActions } from "../features/SampleToolKitUserInfo";
import { useAppDispatch, useAppSelector } from "../features/store";

const UserInfo = () => {
  const userInfoSelector = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const result = dispatch(userInfoActions.fetchUser());
  }, []);

  if (userInfoSelector.isLoading) {
    return <h1>ローディング</h1>;
  }
  if (!userInfoSelector.isLoading && userInfoSelector.data) {
    return (
      <div>
        email: {userInfoSelector.data.email}
        <button onClick={() => dispatch(userInfoActions.clean())}>clean</button>
      </div>
    );
  }

  if (!userInfoSelector.isLoading && userInfoSelector.isError) {
    return <div>Error</div>;
  }
};

export default UserInfo;

// https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
//https://zenn.dev/himorishige/articles/de9593a77863e8
