# Product Card

Card Component for React applications using the "Compound Component" and "Function as a child" patterns.

## Installing

### Package manager

Using npm:

```bash
$ npm install jumagu-product-card-rollup
```

Using bower:

```bash
$ bower install jumagu-product-card-rollup
```

Using yarn:

```bash
$ yarn add jumagu-product-card-rollup
```

Using pnpm:

```bash
$ pnpm add jumagu-product-card-rollup
```

## Guide & Examples

### Basic Usage

To use the product card, you must import the `<ProductCard />` and provide the mandatory properties: `product` and `children`. The product one must satisfy the Product interface:

```ts
interface Product {
  id: string;
  title: string;
  img?: string;
}
```

Children should be the other three components included in the package, which are: `<ProductImage />`, `<ProductTitle />`, `<ProductButtons />`. These should be there for the correct functioning of the component. However, it is possible to include any other valid React component or HTML element.

The child components communicate with the parent through a context shared by `<ProductCard />`, so there is no need to send extra properties to the children. However, for the case of the `<ProductImage />` and `<ProductTitle />` the optional `img` and `title` propeties can be sent respectively to overwrite the values of the product that is initially sent to the `<ProductCard />`.

```jsx
import {
  type Product,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
} from "jumagu-product-card-rollup";

const product: Product = {
  id: "1",
  title: "Coffee Mug",
  img: "./coffee-mug.png",
};

export const Products = () => {
  return (
    <ProductCard product={product}>
      <ProductImage img="https://example-image.com" />
      <ProductTitle title="Example title" />
      <ProductButtons />

      {/* Other components */}
      <Price price={45} />
    </ProductCard>
  );
};
```

Another way to use child components is to extract them from the `<ProductCard />` as properties of an object, as follows:

```jsx
<ProductCard product={product}>
  <ProductCard.Image />
  <ProductCard.Title />
  <ProductCard.Buttons />
</ProductCard>
```

### Extensible Styles

Additionally, custom styles can be passed to the components, by means of props, as shown below:

```jsx
<ProductCard
  product={product}
  style={{ backgroundColor: "rgb(56, 56, 56)", color: "white" }}
>
  {/* You can use the style property */}
  <ProductCard.Image
    style={{
      margin: 10,
      borderRadius: 10,
      width: "calc(100% - 20px)",
    }}
  />

  {/* You can also use the className */}
  <ProductCard.Title className="custom-title" />

  {/* Or you can use both :) */}
  <ProductCard.Buttons
    className="custom-btn"
    style={{
      backgroundColor: "salmon",
      width: "fit-content",
      borderRadius: 5,
    }}
  />
</ProductCard>
```

### Control Props

In case you need to manipulate the state of the card, such as controlling the quantity of a product being carried, you can use additional properties to control this: `quantity` and `onChange`. These properties can control the state of the card according to the needs, for example with a custom hook, as shown below:

```jsx
import {
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
  useShoppingCart,
} from "jumagu-product-card-rollup";

import { products } from "../data/products.data";

export const ShoppingCart = () => {
  const { shoppingCart, handleAddToCart } = useShoppingCart(); // ! This custom hook is included in the package

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="bg-dark text-white"
          quantity={shoppingCart[product.id]?.quantity || 0}
          onChange={handleAddToCart}
        >
          <ProductImage className="custom-image" />
          <ProductTitle className="text-bold" />
          <ProductButtons className="custom-buttons" />
        </ProductCard>
      ))}
    </>
  );
};
```

### State Initializer

Now, the recommended way to use the `<ProductCard />` is to pass it the `initialValues` property to initialize the values as required and, instead of using the Compound Component pattern, the pattern "function as a child" is used, which is way better for reusability, fexibility and state sharing.

This function receives an object that contains the product, quantity, maxQuantity, isMaxQuantityReached, incrementBy, and reset properties, and it returns a JSX fragment that contains ProductImage, ProductTitle, and ProductButtons components. Here it is aslo possible to include any other valid React component or HTML element.

```jsx
<ProductCard
  product={products[0]}
  className="bg-dark text-white"
  initialValues={{ quantity: 5, maxQuantity: 10 }}
>
  {({ quantity, maxQuantity, incrementBy, reset }) => (
    <>
      <ProductImage className="custom-image" />
      <ProductTitle className="text-bold" />
      <ProductButtons className="custom-buttons" />

      <div>
        <button onClick={() => incrementBy(-2)}>-2</button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => incrementBy(2)}>+2</button>
        <span>
          {quantity} / {maxQuantity}
        </span>
      </div>
    </>
  )}
</ProductCard>
```
