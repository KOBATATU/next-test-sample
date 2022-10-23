import { incrementByAmount } from "../CounterSlice";
import customCounterReducer, { counterActions } from "./customCounterSlice";

describe("extraReducers", () => {
  let initialState = {
    status: 0,
    value: 0,
    username: "",
  };
  it("fulfilled", () => {
    const action = {
      type: counterActions.fetchDummy.fulfilled.type,
      payload: 5,
    };
    const state = customCounterReducer(initialState, action);
    expect(state.value).toEqual(105);
  });
  it("rejected", () => {
    initialState.value = 0;
    const action = {
      type: counterActions.fetchDummy.rejected.type,
      payload: 5,
    };
    const state = customCounterReducer(initialState, action);
    expect(state.value).toEqual(-100);
  });
});
