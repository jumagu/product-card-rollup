import type { JSX } from "react";

export interface Product {
  id: string;
  title: string;
  img?: string;
}

export interface ChangeArgs {
  product: Product;
  quantity: number;
}

export interface InitialValues {
  quantity?: number;
  maxQuantity?: number;
}

export interface ProductCardHandlers {
  product: Product;
  quantity: number;
  maxQuantity?: number;
  isMaxQuantityReached: boolean;

  incrementBy: (value: number) => void;
  reset: () => void;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  children?: React.ReactNode | ((args: ProductCardHandlers) => React.ReactNode);
  style?: React.CSSProperties;
  onChange?: (args: ChangeArgs) => void;
  quantity?: number;
  initialValues?: InitialValues;
}

export interface ProductTitleProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductImageProps {
  img?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductButttonsProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ProductContextType {
  product: Product;
  quantity: number;
  maxQuantity?: number;
  incrementBy: (value: number) => void;
}

export interface ProductCardHOCProps {
  ({ children, product }: ProductCardProps): JSX.Element;
  Title: (Props: ProductTitleProps) => JSX.Element;
  Image: (Props: ProductImageProps) => JSX.Element;
  Buttons: (Props: ProductButttonsProps) => JSX.Element;
}
