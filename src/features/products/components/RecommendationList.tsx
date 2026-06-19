import React from "react";
import { Section } from "../../../shared/components/Section";
import type { Recommendation } from "../types";

type Props = {
  recommendations: Recommendation[];
  loadingRecommendations: boolean;
  currency: string;
};

export function RecommendationList({
  recommendations,
  loadingRecommendations,
  currency,
}: Props) {
  return (
    <Section marginTop={48}>
      <h2>You may also like</h2>

      {loadingRecommendations && <p>Loading recommendations...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {recommendations.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.name} width={200} height={200} />
            <h3>{item.name}</h3>
            <p>
              {currency} {item.price.toFixed(2)}
            </p>
            <a href={`/products/${item.id}`}>View product</a>
          </article>
        ))}
      </div>
    </Section>
  );
}
