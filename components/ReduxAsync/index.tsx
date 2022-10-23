import { counterActions } from "../../features/customCounter/customCounterSlice";
import { useAppDispatch, useAppSelector } from "../../features/store";

const ReduxAsync = () => {
  const dispatch = useAppDispatch();
  const customSelector = useAppSelector((state) => state.customCounter);

  return (
    <div>
      <span data-testid="count-value">{customSelector.value}</span>
      <button onClick={() => dispatch(counterActions.fetchDummy(5))}>
        FetchDummy
      </button>
      {customSelector.username && <h1>{customSelector.username}</h1>}

      <button onClick={() => dispatch(counterActions.fetchJSON())}>
        FetchJson
      </button>
    </div>
  );
};

export default ReduxAsync;
