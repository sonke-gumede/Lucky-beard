import styled from "styled-components";
import { Section } from "../../../shared/components/Section";
import { StarRating } from "./StarRating";
import { useProductsStore } from "../store";
import type { ProductsState } from "../store";
import { useReviews } from "../api/productsApi";
import { Body, Caption, H2, H3 } from "../../../shared/typography";
import Button from "../../../shared/components/Button";

type Props = {
  productId: string;
  description: string;
};

const ReviewCard = styled.article`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

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
      <Button onClick={() => setActiveTab("description")}>Description</Button>
      <Button onClick={() => setActiveTab("reviews")}>Reviews</Button>
      <Button onClick={() => setActiveTab("delivery")}>Delivery</Button>

      {activeTab === "description" && (
        <div>
          <H2>Description</H2>
          <Body>{description}</Body>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <H2>Reviews</H2>

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

          {loadingReviews && <Body>Loading reviews...</Body>}

          {!loadingReviews &&
            reviews.map((review) => (
              <ReviewCard key={review.id}>
                <H3>{review.author}</H3>
                <StarRating rating={review.rating} />
                <Body>{review.body}</Body>
                <Caption>{review.createdAt}</Caption>
              </ReviewCard>
            ))}
        </div>
      )}

      {activeTab === "delivery" && (
        <div>
          <H2>Delivery and returns</H2>
          <Body>
            Delivery estimates are calculated based on stock availability and
            your postcode.
          </Body>
        </div>
      )}
    </Section>
  );
}
