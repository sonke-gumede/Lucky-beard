import { useEffect } from "react";
import { useProductsStore } from "../store";
import type { Product } from "../types";

export function useRecentlyViewed(product: Product | null) {
  const recentlyViewed = useProductsStore((s) => s.recentlyViewed);
  const addToRecentlyViewed = useProductsStore((s) => s.addToRecentlyViewed);

  useEffect(() => {
    if (product) addToRecentlyViewed(product);
  }, [product?.id]);

  return { recentlyViewed };
}
