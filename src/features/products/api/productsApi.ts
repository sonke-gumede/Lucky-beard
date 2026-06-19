import { useQuery, useMutation } from "@tanstack/react-query";
import type { Product, Review, Recommendation } from "../types";

const HEADERS = { Bearer: "Authorization admin_12345438905734895709" };

export function useProduct(productId: string, quantity: number) {
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", productId, quantity],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}?quantity=${quantity}`, { headers: HEADERS });
      if (!res.ok) throw new Error("Could not load product");
      return res.json();
    },
  });

  return {
    product: product ?? null,
    loadingProduct: isLoading,
    error: error ? "Could not load product" : "",
  };
}

export function useReviews(productId: string, sortReviewsBy: string) {
  const { data, isLoading } = useQuery<Review[]>({
    queryKey: ["reviews", productId, sortReviewsBy],
    queryFn: async () => {
      const res = await fetch(`/api/products/${productId}/reviews?sort=${sortReviewsBy}`, { headers: HEADERS });
      if (!res.ok) throw new Error("Could not load reviews");
      return res.json();
    },
  });

  return {
    reviews: data ?? [],
    loadingReviews: isLoading,
  };
}

export function useRecommendations(productId: string, category?: string) {
  const { data, isLoading } = useQuery<Recommendation[]>({
    queryKey: ["recommendations", productId, category],
    queryFn: async () => {
      const res = await fetch(`/api/recommendations?productId=${productId}&category=${category}`, { headers: HEADERS });
      if (!res.ok) throw new Error("Could not load recommendations");
      return res.json();
    },
    enabled: !!category,
  });

  return {
    recommendations: data ?? [],
    loadingRecommendations: isLoading,
  };
}

export function useWishlist(
  productId: string | undefined,
  setIsWishlisted: (value: boolean) => void,
) {
  const { mutate } = useMutation({
    mutationFn: (currentlyWishlisted: boolean) => {
      return fetch("/api/wishlist", {
        method: currentlyWishlisted ? "DELETE" : "POST",
        body: JSON.stringify({ productId }),
        headers: HEADERS,
      });
    },
    onMutate: (currentlyWishlisted: boolean) => setIsWishlisted(!currentlyWishlisted),
    onError: (_err: Error, currentlyWishlisted: boolean) => setIsWishlisted(currentlyWishlisted),
  });

  return { mutate };
}

export function useAnalytics() {
  const { mutate: sendAnalytics } = useMutation({
    mutationFn: (p: Product) => {
      return fetch("/api/analytics/product-view", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          productId: p.id,
          name: p.name,
          category: p.category,
          viewedAt: new Date().toISOString(),
        }),
      });
    },
  });

  return { sendAnalytics };
}
