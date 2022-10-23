import { incrementByAmount } from "../CounterSlice";
import customCounterReducer, { counterActions } from "./customCounterSlice";

describe("reducer の基本的なテスト", () => {
  describe("increment action", () => {
    let initialState = {
      status: 0,
      value: 1,
      username: "",
    };
    it("increment by 1 with status 0", () => {
      const action = { type: counterActions.increment.type };
      const state = customCounterReducer(initialState, action);
      expect(state.value).toEqual(2);
    });

    it("increment by 100 with status 1", () => {
      initialState.status = 1;
      const action = { type: counterActions.increment.type };
      const state = customCounterReducer(initialState, action);
      expect(state.value).toEqual(101);
    });

    it("increment by 10000 with status 2", () => {
      initialState.status = 2;
      const action = { type: counterActions.increment.type };
      const state = customCounterReducer(initialState, action);
      expect(state.value).toEqual(10001);
    });
    describe("incrementByAmount action", () => {
      let initialState = {
        status: 0,
        value: 1,
        username: "",
      };
      it("status 0", () => {
        const action = { type: incrementByAmount.type, payload: 3 };
        const state = customCounterReducer(initialState, action);
        expect(state.value).toEqual(4);
      });
      it("status 1", () => {
        initialState.value = 1;
        initialState.status = 1;
        const action = { type: incrementByAmount.type, payload: 3 };
        const state = customCounterReducer(initialState, action);
        expect(state.value).toEqual(301);
      });
      it("status 2", () => {
        initialState.value = 1;
        initialState.status = 2;
        const action = { type: incrementByAmount.type, payload: 3 };
        const state = customCounterReducer(initialState, action);
        expect(state.value).toEqual(30001);
      });
    });
  });
});
