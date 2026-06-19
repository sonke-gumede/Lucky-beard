import { useEffect } from "react";
import { useCartStore } from "../store";

export function useCart() {
  const loadCart = useCartStore((s) => s.loadCart);
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return { cart, addToCart };
}
