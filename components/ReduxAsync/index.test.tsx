import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { render, screen, RenderResult, cleanup } from "@testing-library/react";
//npm install --save-dev @testing-library/user-event
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import ReduxAsync from ".";
import customCounterReducer from "../../features/customCounter/customCounterSlice";

//mock serverを起動する
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

beforeAll(() => {
  server.listen();
});

//unmount
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

//serverを閉じる
afterAll(() => {
  server.close();
});

describe("ReduxAsync test", () => {
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

  it("fetchDummy with 100 + payload", async () => {
    renderResult = render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    await userEvent.click(renderResult.getByText("FetchDummy"));
    //sleepさせるようなものがあるときはfindを使う
    expect(await renderResult.findByTestId("count-value")).toHaveTextContent(
      "105"
    );
  });
});

describe("redux async api mocking", () => {
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
  it("Fetch success username in h3 tag", async () => {
    renderResult = render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    expect(renderResult.queryByRole("heading")).toBeNull();
    await userEvent.click(renderResult.getByText("FetchJson"));
    expect(await renderResult.findByText("Bred dummy")).toBeInTheDocument();
  });

  it("Fetch failed username in h3 tag", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    renderResult = render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );

    expect(renderResult.queryByRole("heading")).toBeNull();
    await userEvent.click(renderResult.getByText("FetchJson"));
    expect(await renderResult.findByText("anonymous")).toBeInTheDocument();
  });
});
