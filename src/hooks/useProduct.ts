import { useEffect, useRef, useState } from "react";
import {
  Product,
  ChangeArgs,
  InitialValues,
} from "../interfaces/product.interfaces";

interface UseProductArgs {
  product: Product;
  onChange?: (args: ChangeArgs) => void;
  quantity?: number;
  initialValues?: InitialValues;
}

export const useProduct = ({
  product,
  onChange,
  quantity: productQuantity = 0,
  initialValues,
}: UseProductArgs) => {
  const [quantity, setQuantity] = useState<number>(
    initialValues?.quantity || productQuantity,
  );

  const isMounted = useRef(false);

  const incrementBy = (value: number) => {
    if (onChange) {
      onChange({ product, quantity: value });
      return;
    }

    let newValue = Math.max(0, quantity + value);

    if (initialValues?.maxQuantity) {
      newValue = Math.min(newValue, initialValues.maxQuantity);
    }

    setQuantity(newValue);
  };

  const reset = () => {
    setQuantity(initialValues?.quantity || 0);
  };

  useEffect(() => {
    if (!isMounted.current) return;

    setQuantity(initialValues?.quantity || productQuantity);
  }, [productQuantity, initialValues?.quantity]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return {
    quantity,
    incrementBy,
    reset,
  };
};
