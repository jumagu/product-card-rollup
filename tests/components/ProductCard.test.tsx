import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductCard } from "../../src/components";
import { product } from "../fixtures";

describe("<ProductCard />", () => {
  it("provides product context to its compound children", () => {
    render(
      <ProductCard product={product}>
        <ProductCard.Title />
      </ProductCard>
    );

    // The child reads the title from context, not from its own props.
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  describe("function as a child", () => {
    it("exposes the current state and derived flags to the render prop", () => {
      render(
        <ProductCard
          product={product}
          initialValues={{ quantity: 4, maxQuantity: 4 }}
        >
          {({ quantity, maxQuantity, isMaxQuantityReached }) => (
            <>
              <span data-testid="quantity">{quantity}</span>
              <span data-testid="max">{maxQuantity}</span>
              <span data-testid="reached">{String(isMaxQuantityReached)}</span>
            </>
          )}
        </ProductCard>
      );

      expect(screen.getByTestId("quantity")).toHaveTextContent("4");
      expect(screen.getByTestId("max")).toHaveTextContent("4");
      expect(screen.getByTestId("reached")).toHaveTextContent("true");
    });

    it("updates state through the handlers it receives", async () => {
      const user = userEvent.setup();

      render(
        <ProductCard product={product} initialValues={{ quantity: 1 }}>
          {({ quantity, incrementBy, reset }) => (
            <>
              <span data-testid="quantity">{quantity}</span>
              <button onClick={() => incrementBy(2)}>add</button>
              <button onClick={reset}>reset</button>
            </>
          )}
        </ProductCard>
      );

      await user.click(screen.getByRole("button", { name: "add" }));
      expect(screen.getByTestId("quantity")).toHaveTextContent("3");

      await user.click(screen.getByRole("button", { name: "reset" }));
      expect(screen.getByTestId("quantity")).toHaveTextContent("1");
    });
  });
});
