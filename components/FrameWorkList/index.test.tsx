import { render, screen, RenderResult, cleanup } from "@testing-library/react";
import RenderInput from "./index";
//npm install --save-dev @testing-library/user-event
import userEvent from "@testing-library/user-event";

import FrameWorkList from "./index";

//unmount
afterEach(() => cleanup());

describe("propsから配列要素を受け取る", () => {
  let renderResult: RenderResult;
  it("propsから受け取る要素がゼロのとき", () => {
    renderResult = render(<FrameWorkList />);
    expect(renderResult.getByText("no data")).toBeInTheDocument();
  });

  it("propsから受け取ったitemが描画される", () => {
    const dummyData = [
      {
        id: 1,
        item: "React",
      },
      {
        id: 2,
        item: "Angular",
      },
      {
        id: 3,
        item: "Vue",
      },
    ];
    renderResult = render(<FrameWorkList frameworks={dummyData} />);
    //<li>のtextを取得
    const framwrorkItems = renderResult
      .getAllByRole("listitem")
      .map((ele) => ele.textContent);

    const dummyItems = dummyData.map((ele) => ele.item);
    expect(framwrorkItems).toEqual(dummyItems);
    expect(renderResult.queryByText("no data")).toBeNull();
  });
});
