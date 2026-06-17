import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProductCard, ProductButtons } from "../../src/components";
import { product } from "../fixtures";

const renderButtons = (props?: React.ComponentProps<typeof ProductCard>) =>
  render(
    <ProductCard product={product} {...props}>
      <ProductButtons />
    </ProductCard>
  );

const plus = () => screen.getByRole("button", { name: "+" });
const minus = () => screen.getByRole("button", { name: "-" });
// The quantity is the only numeric text rendered, so matching it directly
// keeps the test independent of markup/class-name details.

describe("<ProductButtons />", () => {
  it("displays the current quantity", () => {
    renderButtons({ product, initialValues: { quantity: 3 } });

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("increments the quantity when pressing +", async () => {
    const user = userEvent.setup();
    renderButtons();

    await user.click(plus());

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("decrements the quantity when pressing -", async () => {
    const user = userEvent.setup();
    renderButtons({ product, initialValues: { quantity: 2 } });

    await user.click(minus());

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not decrement below 0", async () => {
    const user = userEvent.setup();
    renderButtons();

    await user.click(minus());

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
