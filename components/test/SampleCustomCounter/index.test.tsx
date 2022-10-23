import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { render, screen, RenderResult, cleanup } from "@testing-library/react";
//npm install --save-dev @testing-library/user-event
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import customCounterReducer from "../../../features/customCounter/customCounterSlice";
import SampleCustomCounter from "../../../pages/sample_custom_counter";

//componentでreducerを使ったintegration testを実行

afterEach(() => {
  cleanup();
});

describe("reduxのintegration test", () => {
  let store: Store<any, AnyAction>;
  let renderResult: RenderResult;
  beforeEach(() => {
    //storeを作成しstateを初期化
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer,
      },
    });
  });

  it("incrementをした時にdisplayに足された数が表示される", async () => {
    renderResult = render(
      <Provider store={store}>
        <SampleCustomCounter />
      </Provider>
    );

    await userEvent.click(renderResult.getByText("+"));
    await userEvent.click(renderResult.getByText("+"));
    await userEvent.click(renderResult.getByText("+"));

    expect(renderResult.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("decrementをした時にdisplayに引き算された数が表示される", async () => {
    renderResult = render(
      <Provider store={store}>
        <SampleCustomCounter />
      </Provider>
    );

    await userEvent.click(renderResult.getByText("-"));
    await userEvent.click(renderResult.getByText("-"));
    await userEvent.click(renderResult.getByText("-"));

    expect(renderResult.getByTestId("count-value")).toHaveTextContent("-3");
  });

  it("incrementByAmountをした時にdisplayに引き算された数が表示される", async () => {
    renderResult = render(
      <Provider store={store}>
        <SampleCustomCounter />
      </Provider>
    );

    await userEvent.type(renderResult.getByPlaceholderText("Enter"), "30");
    await userEvent.click(renderResult.getByText("IncrementByAmount"));

    expect(renderResult.getByTestId("count-value")).toHaveTextContent("30");
  });
});
