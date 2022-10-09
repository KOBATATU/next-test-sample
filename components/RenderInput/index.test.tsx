import { render, screen, RenderResult, cleanup } from "@testing-library/react";
import RenderInput from "./index";
//npm install --save-dev @testing-library/user-event
import userEvent from "@testing-library/user-event";

//unmount
afterEach(() => cleanup());

describe("Redering", () => {
  let renderResult: RenderResult;

  it("要素を描画", () => {
    renderResult = render(<RenderInput outputConsole={jest.fn()} />);
    expect(renderResult.getByRole("button")).toBeTruthy();
    expect(renderResult.getByPlaceholderText("Enter")).toBeTruthy();
  });

  describe("input要素の変化", () => {
    it("input 要素が正しく更新されている", async () => {
      renderResult = render(<RenderInput outputConsole={jest.fn()} />);
      const inputValue = renderResult.getByPlaceholderText("Enter");
      await userEvent.type(inputValue, "test");

      //expect(inputValue.value).toBe("test");という書き方があるがtsであるとvalueのプロパティがないためエラー構文となる
      expect(renderResult.getByDisplayValue("test")).toBeTruthy();
    });
  });
});

describe("ボタンのトリガー", () => {
  let renderResult: RenderResult;
  it("inputに入力がなければ関数が起動しない", async () => {
    const outputConsole = jest.fn();
    renderResult = render(<RenderInput outputConsole={outputConsole} />);
    await userEvent.click(renderResult.getByRole("button"));
    expect(outputConsole).not.toHaveBeenCalled();
  });

  it("inputに入力があり関数が呼び出される", async () => {
    const outputConsole = jest.fn();
    renderResult = render(<RenderInput outputConsole={outputConsole} />);
    const inputValue = renderResult.getByPlaceholderText("Enter");
    await userEvent.type(inputValue, "test");
    await userEvent.click(renderResult.getByRole("button"));

    expect(outputConsole).toHaveBeenCalledTimes(1);
  });
});
