import { useContext } from "react";

import noImage from "../assets/no-image.jpg";
import styles from "../styles/styles.module.css";

import { ProductContext } from "./ProductCard";
import { ProductImageProps } from "../interfaces/product.interfaces";

export const ProductImage = ({ img, className, style }: ProductImageProps) => {
  const { product } = useContext(ProductContext);

  let imgToDisplay: string;

  if (img) {
    imgToDisplay = img;
  } else if (product.img) {
    imgToDisplay = product.img;
  } else {
    imgToDisplay = noImage;
  }

  return (
    <img
      className={`${styles.productImg} ${className}`}
      style={style}
      src={imgToDisplay}
      alt="Product"
    />
  );
};
