import { create } from "zustand";
import type { CartItem } from "./types";

export type CartState = {
  cart: CartItem[];
  couponCode: string;
  couponMessage: string;
  discount: number;
  postcode: string;

  loadCart: () => void;
  addToCart: (item: CartItem) => void;
  setCouponCode: (code: string) => void;
  applyCoupon: () => void;
  setPostcode: (postcode: string) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  couponCode: "",
  couponMessage: "",
  discount: 0,
  postcode: "",

  loadCart: () => {
    const saved = localStorage.getItem("cart");
    if (saved) set({ cart: JSON.parse(saved) });
  },

  addToCart: (item) => {
    const { cart } = get();
    const updated = [...cart, item];
    set({ cart: updated });
    localStorage.setItem("cart", JSON.stringify(updated));
    alert("Added to cart");
  },

  setCouponCode: (code) => set({ couponCode: code }),

  applyCoupon: () => {
    const { couponCode } = get();

    if (couponCode === "WELCOME10") {
      set({ discount: 1, couponMessage: "Coupon applied" });
      return;
    }

    if (couponCode === "SAVE20") {
      set({ discount: 0.2, couponMessage: "Coupon applied" });
      return;
    }

    if (couponCode.trim().length === 0) {
      set({ couponMessage: "Enter a coupon code" });
      return;
    }

    set({ discount: 0, couponMessage: "Invalid coupon" });
  },

  setPostcode: (postcode) => set({ postcode }),
}));
