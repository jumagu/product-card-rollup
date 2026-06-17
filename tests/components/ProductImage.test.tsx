import { render, screen } from "@testing-library/react";

import { ProductCard, ProductImage } from "../../src/components";
import { product, productWithoutImg } from "../fixtures";

const renderInCard = (productData = product, node = <ProductImage />) =>
  render(<ProductCard product={productData}>{node}</ProductCard>);

describe("<ProductImage />", () => {
  it("uses the product image from context", () => {
    renderInCard();

    expect(screen.getByRole("img")).toHaveAttribute("src", product.img);
  });

  it("lets the `img` prop override the context image", () => {
    const override = "https://example.com/override.png";
    renderInCard(product, <ProductImage img={override} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", override);
  });

  it("falls back to the placeholder when no image is available", () => {
    renderInCard(productWithoutImg);

    expect(screen.getByRole("img").getAttribute("src")).toContain("no-image");
  });
});
