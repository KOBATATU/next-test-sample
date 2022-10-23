import { act, cleanup, renderHook } from "@testing-library/react";
import { useCounter } from "../../features/useCounter";

//unmount
afterEach(() => {
  cleanup();
});

describe("useCounter custom Hook", () => {
  it("increment by 1", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 3 }));
    expect(result.current.count).toBe(3);
    //hookの関数を実行するのはactを使う
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(4);
  });

  it("decrement by 1", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 3 }));
    expect(result.current.count).toBe(3);
    //hookの関数を実行するのはactを使う
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(2);
  });

  it("double", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 3 }));
    expect(result.current.count).toBe(3);
    //hookの関数を実行するのはactを使う
    act(() => {
      result.current.double();
    });
    expect(result.current.count).toBe(6);
  });

  it("reset", () => {
    const { result } = renderHook(() => useCounter({ initialCount: 3 }));
    expect(result.current.count).toBe(3);
    //hookの関数を実行するのはactを使う
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
