import React from "react";
import styled from "styled-components";
import { Section } from "../../../shared/components/Section";
import { H2, H3, Body } from "../../../shared/typography";
import type { Recommendation } from "../types";

type Props = {
  recommendations: Recommendation[];
  loadingRecommendations: boolean;
  currency: string;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export function RecommendationList({
  recommendations,
  loadingRecommendations,
  currency,
}: Props) {
  return (
    <Section marginTop={48}>
      <H2>You may also like</H2>

      {loadingRecommendations && <Body>Loading recommendations...</Body>}

      <Grid>
        {recommendations.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.name} width={200} height={200} />
            <H3>{item.name}</H3>
            <Body>
              {currency} {item.price.toFixed(2)}
            </Body>
            <a href={`/products/${item.id}`}>View product</a>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
