import { render, screen, RenderResult, cleanup } from "@testing-library/react";
import UseEffectRender from "./index";
import userEvent from "@testing-library/user-event";

//unmount
afterEach(() => cleanup());

describe("useEffectが起動できる", () => {
  let renderResult: RenderResult;
  it("asyncされた後に描画される", async () => {
    renderResult = render(<UseEffectRender />);

    expect(renderResult.queryByText(/I am/)).toBeNull();
    //awaitしてシンクしてくれるまで待ってくれる
    expect(await renderResult.findByText(/I am/)).toBeInTheDocument();
  });
});
