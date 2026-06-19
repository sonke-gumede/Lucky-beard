import { useEffect, useRef } from "react";
import styled from "styled-components";
import { PageWrapper } from "../shared/components/PageWrapper";
import {
  useProduct,
  useRecommendations,
  useAnalytics,
} from "../features/products/api/productsApi";
import { useProductsStore } from "../features/products/store";
import type { ProductsState } from "../features/products/store";
import { useRecentlyViewed } from "../features/products/hooks/useRecentlyViewed";
import { ProductGallery } from "../features/products/components/ProductGallery";
import { ProductInfo } from "../features/products/components/ProductInfo";
import { ProductTabs } from "../features/products/components/ProductTabs";
import { RecommendationList } from "../features/products/components/RecommendationList";
import { RecentlyViewed } from "../features/products/components/RecentlyViewed";
import { Body, H1 } from "../shared/typography";
import Button from "../shared/components/Button";

const ProductLayout = styled.div`
  display: flex;
  gap: 32px;
`;

export default function ProductPageClient({
  productId,
}: {
  productId: string;
}) {
  const quantity = useProductsStore((s: ProductsState) => s.quantity);
  const selectedImage = useProductsStore((s: ProductsState) => s.selectedImage);
  const setSelectedImage = useProductsStore(
    (s: ProductsState) => s.setSelectedImage,
  );

  const { product, loadingProduct, error } = useProduct(productId, quantity);
  const { recommendations, loadingRecommendations } = useRecommendations(
    productId,
    product?.category,
  );
  const { recentlyViewed } = useRecentlyViewed(product ?? null);
  const { sendAnalytics } = useAnalytics();

  const hasSent = useRef(false);
  useEffect(() => {
    if (product && !hasSent.current) {
      sendAnalytics(product);
      hasSent.current = true;
    }
  }, [product?.id]);

  useEffect(() => {
    if (product?.images[0]) setSelectedImage(product.images[0]);
  }, [productId]);

  if (loadingProduct) {
    return (
      <PageWrapper>
        <Body>Loading product...</Body>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <H1>Something went wrong</H1>
        <Body>{error}</Body>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <Body>No product found.</Body>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ProductLayout>
        <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          productName={product.name}
          onSelectImage={setSelectedImage}
        />
        <ProductInfo product={product} />
      </ProductLayout>

      <ProductTabs productId={productId} description={product.description} />

      <RecommendationList
        recommendations={recommendations}
        loadingRecommendations={loadingRecommendations}
        currency={product.currency}
      />

      <RecentlyViewed items={recentlyViewed} />
    </PageWrapper>
  );
}
