import { render, screen, RenderResult, cleanup } from "@testing-library/react";
import MockServer, { User } from "./index";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

//関数をmock化する方法
//https://qiita.com/yuma-ito-bd/items/38c929eb5cccf7ce501e

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

describe("Mocking API", () => {
  let renderResult: RenderResult;
  it("Fetchが成功しボタンが無効化される(disabled)", async () => {
    renderResult = render(<MockServer />);
    await userEvent.click(renderResult.getByRole("button"));
    expect(await renderResult.findByRole("heading")).toHaveTextContent(
      "Bred dummy"
    );
    //属性があるかを判定
    expect(renderResult.getByRole("button")).toHaveAttribute("disabled");
  });

  it("Fetchが失敗しエラーメッセージが表示される", async () => {
    //useで返したいものを一時的に返ることができる。別のitでは元で定義したものがgetされる
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );

    renderResult = render(<MockServer />);
    await userEvent.click(renderResult.getByRole("button"));

    expect(await renderResult.findByTestId("error")).toHaveTextContent(
      "Fetching Failed !"
    );

    expect(renderResult.queryByRole("heading")).toBeNull();
    expect(renderResult.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
