import { create } from "zustand";
import type { Product } from "./types";

export type ProductsState = {
  selectedImage: string;
  isWishlisted: boolean;
  recentlyViewed: Product[];
  quantity: number;
  activeTab: string;
  sortReviewsBy: string;

  setSelectedImage: (image: string) => void;
  setIsWishlisted: (value: boolean) => void;
  addToRecentlyViewed: (product: Product) => void;
  setQuantity: (quantity: number) => void;
  setActiveTab: (tab: string) => void;
  setSortReviewsBy: (sort: string) => void;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  selectedImage: "",
  isWishlisted: false,
  recentlyViewed: [],
  quantity: 1,
  activeTab: "description",
  sortReviewsBy: "newest",

  setSelectedImage: (image) => set({ selectedImage: image }),
  setIsWishlisted: (value: boolean) => set({ isWishlisted: value }),

  addToRecentlyViewed: (product: Product) => {
    const { recentlyViewed } = get();
    const next = [product, ...recentlyViewed.filter((p: Product) => p.id !== product.id)].slice(0, 5);
    set({ recentlyViewed: next });
    localStorage.setItem("recentlyViewed", JSON.stringify(next));
  },

  setQuantity: (quantity) => set({ quantity }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSortReviewsBy: (sort) => set({ sortReviewsBy: sort }),
}));
