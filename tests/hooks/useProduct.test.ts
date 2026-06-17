import { act, renderHook } from "@testing-library/react";

import { useProduct } from "../../src/hooks/useProduct";
import { product } from "../fixtures";

describe("useProduct", () => {
  it("starts at quantity 0 by default", () => {
    const { result } = renderHook(() => useProduct({ product }));

    expect(result.current.quantity).toBe(0);
  });

  it("initializes from initialValues.quantity", () => {
    const { result } = renderHook(() =>
      useProduct({ product, initialValues: { quantity: 5 } })
    );

    expect(result.current.quantity).toBe(5);
  });

  it("increments and decrements the quantity", () => {
    const { result } = renderHook(() =>
      useProduct({ product, initialValues: { quantity: 2 } })
    );

    act(() => result.current.incrementBy(3));
    expect(result.current.quantity).toBe(5);

    act(() => result.current.incrementBy(-1));
    expect(result.current.quantity).toBe(4);
  });

  it("never drops below 0", () => {
    const { result } = renderHook(() => useProduct({ product }));

    act(() => result.current.incrementBy(-1));

    expect(result.current.quantity).toBe(0);
  });

  it("never exceeds maxQuantity", () => {
    const { result } = renderHook(() =>
      useProduct({ product, initialValues: { quantity: 8, maxQuantity: 10 } })
    );

    act(() => result.current.incrementBy(5));

    expect(result.current.quantity).toBe(10);
  });

  it("reset returns to the initial quantity", () => {
    const { result } = renderHook(() =>
      useProduct({ product, initialValues: { quantity: 3 } })
    );

    act(() => result.current.incrementBy(4));
    expect(result.current.quantity).toBe(7);

    act(() => result.current.reset());
    expect(result.current.quantity).toBe(3);
  });

  describe("controlled mode (onChange provided)", () => {
    it("delegates changes to onChange instead of mutating internal state", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useProduct({ product, quantity: 4, onChange })
      );

      act(() => result.current.incrementBy(1));

      // The parent owns the state: onChange receives the requested delta,
      // and the hook's own quantity stays put until the parent feeds a new value.
      expect(onChange).toHaveBeenCalledWith({ product, quantity: 1 });
      expect(result.current.quantity).toBe(4);
    });

    it("syncs to a new controlled quantity from the parent", () => {
      const { result, rerender } = renderHook(
        ({ quantity }) => useProduct({ product, quantity, onChange: vi.fn() }),
        { initialProps: { quantity: 0 } }
      );

      expect(result.current.quantity).toBe(0);

      rerender({ quantity: 2 });

      expect(result.current.quantity).toBe(2);
    });
  });
});
