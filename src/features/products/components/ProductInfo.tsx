import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
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
import { Body, H1 } from "../../../shared/typography";
import Button from "../../../shared/components/Button";

type Props = {
  product: Product;
};

const InfoSection = styled(Section)`
  width: 50%;
`;

const PriceWrapper = styled.div`
  margin-top: 24px;
`;

const OriginalPrice = styled(Body)`
  text-decoration: line-through;
`;

const FinalPrice = styled(Body)`
  font-size: 28px;
`;

const QuantityWrapper = styled.div`
  margin-top: 24px;
`;

const Actions = styled.div`
  margin-top: 24px;
`;

const Tags = styled.div`
  margin-top: 24px;
`;

const Tag = styled.span`
  margin-right: 8px;
`;

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
    <InfoSection>
      <Body>{product.category}</Body>
      <H1>{product.name}</H1>
      <Body>SKU: {product.sku}</Body>

      <div>
        <StarRating rating={product.rating} />
        <span> ({product.reviewCount} reviews)</span>
      </div>

      <PriceWrapper>
        {product.salePrice ? (
          <>
            <OriginalPrice>
              {product.currency} {product.price.toFixed(2)}
            </OriginalPrice>
            <FinalPrice>
              {product.currency} {finalPrice.toFixed(2)}
            </FinalPrice>
          </>
        ) : (
          <FinalPrice>
            {product.currency} {finalPrice.toFixed(2)}
          </FinalPrice>
        )}
      </PriceWrapper>

      <Body>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</Body>

      <QuantityWrapper>
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
      </QuantityWrapper>

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

      <Actions>
        <Button
          disabled={product.stock === 0}
          onClick={() =>
            addToCart({ productId: product.id, quantity, selectedImage })
          }
        >
          Add to cart
        </Button>
        <Button variant="secondary" onClick={toggle}>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </Button>
      </Actions>

      <Tags>
        <Body>Tags:</Body>
        {product.tags.map((tag) => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </Tags>
    </InfoSection>
  );
}
