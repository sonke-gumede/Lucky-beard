import { useCartStore } from "../store";

export function useCoupon() {
  const couponCode = useCartStore((s) => s.couponCode);
  const setCouponCode = useCartStore((s) => s.setCouponCode);
  const couponMessage = useCartStore((s) => s.couponMessage);
  const discount = useCartStore((s) => s.discount);
  const apply = useCartStore((s) => s.applyCoupon);

  return { couponCode, setCouponCode, couponMessage, discount, apply };
}
