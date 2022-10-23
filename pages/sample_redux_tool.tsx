import { useCallback, useEffect } from "react";
import { userInfoActions } from "../features/SampleToolKitUserInfo";
import { useAppDispatch, useAppSelector } from "../features/store";
import type { UserInfo as info } from "../components/LoginUser/index";
import { useRouter } from "next/router";

const UserInfo = () => {
  const userInfoSelector = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(userInfoActions.fetchUser());

      await dispatch(userInfoActions.fetchUser())
        .unwrap()
        .then((result) => {
          console.log(result.id);
        });
    })();
  }, []);

  // useEffect(() => {
  //   if (userInfoSelector.data) {
  //     console.log(userInfoSelector.data);
  //   }
  // }, [userInfoSelector.data]);

  if (userInfoSelector.isLoading) {
    return <h1>ローディング</h1>;
  }
  if (!userInfoSelector.isLoading && userInfoSelector.data) {
    return (
      <div>
        email: {userInfoSelector.data.email}
        <button onClick={() => dispatch(userInfoActions.fetchUser())}>
          clean
        </button>
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
