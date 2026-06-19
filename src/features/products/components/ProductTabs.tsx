import React from "react";
import { Section } from "../../../shared/components/Section";
import { StarRating } from "./StarRating";
import { useProductsStore } from "../store";
import type { ProductsState } from "../store";
import { useReviews } from "../api/productsApi";

type Props = {
  productId: string;
  description: string;
};

export function ProductTabs({ productId, description }: Props) {
  const activeTab = useProductsStore((s: ProductsState) => s.activeTab);
  const setActiveTab = useProductsStore((s: ProductsState) => s.setActiveTab);
  const sortReviewsBy = useProductsStore((s: ProductsState) => s.sortReviewsBy);
  const setSortReviewsBy = useProductsStore(
    (s: ProductsState) => s.setSortReviewsBy,
  );

  const { reviews, loadingReviews } = useReviews(productId, sortReviewsBy);

  return (
    <Section marginTop={48}>
      <button onClick={() => setActiveTab("description")}>Description</button>
      <button onClick={() => setActiveTab("reviews")}>Reviews</button>
      <button onClick={() => setActiveTab("delivery")}>Delivery</button>

      {activeTab === "description" && (
        <div>
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2>Reviews</h2>

          <label>
            Sort by
            <select
              value={sortReviewsBy}
              onChange={(event) => setSortReviewsBy(event.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>

          {loadingReviews && <p>Loading reviews...</p>}

          {!loadingReviews &&
            reviews.map((review) => (
              <article key={review.id} style={{ borderTop: "1px solid #ddd" }}>
                <h3>{review.author}</h3>
                <StarRating rating={review.rating} />
                <p>{review.body}</p>
                <small>{review.createdAt}</small>
              </article>
            ))}
        </div>
      )}

      {activeTab === "delivery" && (
        <div>
          <h2>Delivery and returns</h2>
          <p>
            Delivery estimates are calculated based on stock availability and
            your postcode.
          </p>
        </div>
      )}
    </Section>
  );
}
