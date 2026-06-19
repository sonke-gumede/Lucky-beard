import React, { useCallback, useMemo } from "react";
import { Section } from "../../../shared/components/Section";
import { CouponInput } from "../../cart/components/CouponInput";
import { DeliveryEstimator } from "../../cart/components/DeliveryEstimator";
import { StarRating } from "./StarRating";
import type { Product } from "../types";
import { useProductsStore } from "../store";
import type { ProductsState } from "../store";
import { useCartStore } from "../../cart/store";
import type { CartState } from "../../cart/store";
import { useWishlist } from "../api/productsApi";
import { useDelivery } from "../../cart/api/cartApi";
import { useCoupon } from "../../cart/hooks/useCoupon";
import { useCart } from "../../cart/hooks/useCart";
import { Body } from "../../../shared/typography";

type Props = {
  product: Product;
};

export function ProductInfo({ product }: Props) {
  const quantity = useProductsStore((s: ProductsState) => s.quantity);
  const setQuantity = useProductsStore((s: ProductsState) => s.setQuantity);
  const selectedImage = useProductsStore((s: ProductsState) => s.selectedImage);
  const isWishlisted = useProductsStore((s: ProductsState) => s.isWishlisted);
  const setIsWishlisted = useProductsStore(
    (s: ProductsState) => s.setIsWishlisted,
  );

  const postcode = useCartStore((s: CartState) => s.postcode);
  const setPostcode = useCartStore((s: CartState) => s.setPostcode);

  const { couponCode, setCouponCode, couponMessage, discount, apply } =
    useCoupon();
  const { addToCart } = useCart();
  const { deliveryMessage } = useDelivery(postcode, product.id);
  const { mutate: mutateWishlist } = useWishlist(product.id, setIsWishlisted);

  const toggle = useCallback(() => {
    mutateWishlist(isWishlisted);
  }, [isWishlisted, mutateWishlist]);

  const finalPrice = useMemo(() => {
    const basePrice = product.salePrice || product.price;
    return basePrice - basePrice * discount;
  }, [product, discount]);

  return (
    <Section style={{ width: "50%" }}>
      <Body>{product.category}</Body>
      <h1>{product.name}</h1>
      <Body>SKU: {product.sku}</Body>

      <div>
        <StarRating rating={product.rating} />
        <span> ({product.reviewCount} reviews)</span>
      </div>

      <div style={{ marginTop: 24 }}>
        {product.salePrice ? (
          <>
            <Body style={{ textDecoration: "line-through" }}>
              {product.currency} {product.price.toFixed(2)}
            </Body>
            <Body style={{ fontSize: 28 }}>
              {product.currency} {finalPrice.toFixed(2)}
            </Body>
          </>
        ) : (
          <Body style={{ fontSize: 28 }}>
            {product.currency} {finalPrice.toFixed(2)}
          </Body>
        )}
      </div>

      <Body>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</Body>

      <div style={{ marginTop: 24 }}>
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseInt(e.target.value, 10);
              setQuantity(isNaN(value) || value < 1 ? 1 : value);
            }}
          />
        </label>
      </div>

      <CouponInput
        code={couponCode}
        message={couponMessage}
        onCodeChange={setCouponCode}
        onApply={apply}
      />

      <DeliveryEstimator
        postcode={postcode}
        message={deliveryMessage}
        onPostcodeChange={setPostcode}
      />

      <div style={{ marginTop: 24 }}>
        <button
          disabled={product.stock === 0}
          onClick={() =>
            addToCart({ productId: product.id, quantity, selectedImage })
          }
        >
          Add to cart
        </button>
        <button onClick={toggle}>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <Body>Tags:</Body>
        {product.tags.map((tag) => (
          <span key={tag} style={{ marginRight: 8 }}>
            #{tag}
          </span>
        ))}
      </div>
    </Section>
  );
}
