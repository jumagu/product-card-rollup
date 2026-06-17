import { render, screen } from "@testing-library/react";

import { ProductCard, ProductTitle } from "../../src/components";
import { product } from "../fixtures";

describe("<ProductTitle />", () => {
  it("shows the product title from context", () => {
    render(
      <ProductCard product={product}>
        <ProductTitle />
      </ProductCard>
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  it("lets the `title` prop override the context title", () => {
    render(
      <ProductCard product={product}>
        <ProductTitle title="Custom title" />
      </ProductCard>
    );

    expect(screen.getByText("Custom title")).toBeInTheDocument();
    expect(screen.queryByText(product.title)).not.toBeInTheDocument();
  });
});
