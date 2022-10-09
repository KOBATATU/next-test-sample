import { render, screen, RenderResult } from "@testing-library/react";
import { Render } from "./index";
// npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
describe("Rendering", () => {
  let renderResult: RenderResult;
  it("要素が全てレンダリングされている", () => {
    renderResult = render(<Render />);
    //debugでレンダーされたものをみることができる
    //screen.debug();

    //https://github.com/A11yance/aria-query
    //取得できる要素
    //renderResult.getAllByRole("heading");

    //https://jestjs.io/ja/docs/expect
    //headerがあるかの判定
    expect(renderResult.getAllByRole("heading")).toBeTruthy();
    expect(renderResult.getAllByRole("textbox")).toBeTruthy();

    //2つある場合は配列で返る
    expect(renderResult.getAllByRole("button")[0]).toBeTruthy();
    expect(renderResult.getAllByRole("button")[1]).toBeTruthy();

    //ないものをtestする
    expect(renderResult.queryByText("aaaaaa")).toBeNull();

    expect(renderResult.getByTestId("copyright")).toBeTruthy();
  });
});
