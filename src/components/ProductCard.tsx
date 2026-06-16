import { createContext } from "react";

import styles from "../styles/styles.module.css";

import { useProduct } from "../hooks/useProduct";

import {
  ProductContextType,
  ProductCardProps,
} from "../interfaces/product.interfaces";

// ? Context
export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductCard = ({
  style,
  product,
  children,
  className,
  onChange,
  quantity,
  initialValues,
}: ProductCardProps) => {
  const {
    quantity: productQuantity,
    incrementBy,
    reset,
  } = useProduct({
    product,
    onChange,
    quantity,
    initialValues,
  });

  return (
    <ProductContext.Provider
      value={{
        quantity: productQuantity,
        maxQuantity: initialValues?.maxQuantity,
        incrementBy,
        product,
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {typeof children === "function"
          ? children({
              product,
              quantity: productQuantity,
              maxQuantity: initialValues?.maxQuantity,
              isMaxQuantityReached:
                !!initialValues?.maxQuantity &&
                initialValues.maxQuantity === productQuantity,
              incrementBy,
              reset,
            })
          : children}
      </div>
    </ProductContext.Provider>
  );
};
