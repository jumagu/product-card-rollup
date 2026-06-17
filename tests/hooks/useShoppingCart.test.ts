import { act, renderHook } from "@testing-library/react";

import { useShoppingCart } from "../../src/hooks/useShoppingCart";
import { product } from "../fixtures";

describe("useShoppingCart", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useShoppingCart());

    expect(result.current.shoppingCart).toEqual({});
  });

  it("adds a product to the cart", () => {
    const { result } = renderHook(() => useShoppingCart());

    act(() => result.current.handleAddToCart({ product, quantity: 2 }));

    expect(result.current.shoppingCart[product.id]).toMatchObject({
      id: product.id,
      quantity: 2,
    });
  });

  it("accumulates quantity for the same product", () => {
    const { result } = renderHook(() => useShoppingCart());

    act(() => result.current.handleAddToCart({ product, quantity: 2 }));
    act(() => result.current.handleAddToCart({ product, quantity: 3 }));

    expect(result.current.shoppingCart[product.id].quantity).toBe(5);
  });

  it("removes the product when its quantity reaches 0", () => {
    const { result } = renderHook(() => useShoppingCart());

    act(() => result.current.handleAddToCart({ product, quantity: 2 }));
    act(() => result.current.handleAddToCart({ product, quantity: -2 }));

    expect(result.current.shoppingCart[product.id]).toBeUndefined();
    expect(result.current.shoppingCart).toEqual({});
  });
});
