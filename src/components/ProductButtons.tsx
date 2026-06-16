import { useCallback, useContext } from "react";

import styles from "../styles/styles.module.css";

import { ProductContext } from "./ProductCard";
import { ProductButttonsProps } from "../interfaces/product.interfaces";

export const ProductButtons = ({ className, style }: ProductButttonsProps) => {
  const { quantity, maxQuantity, incrementBy } = useContext(ProductContext);

  const isMaxQuantityReached = useCallback(
    () => !!maxQuantity && quantity === maxQuantity,
    [quantity, maxQuantity]
  );

  return (
    <div className={`${styles.buttonsContainer} ${className}`} style={style}>
      <button
        className={`${styles.buttonMinus} ${
          quantity === 0 && styles.disabledMinus
        }`}
        onClick={() => incrementBy(-1)}
      >
        -
      </button>

      <div className={styles.countLabel}>{quantity}</div>

      <button
        className={`${styles.buttonAdd} ${
          isMaxQuantityReached() && styles.disabledAdd
        } `}
        onClick={() => incrementBy(1)}
      >
        +
      </button>
    </div>
  );
};
