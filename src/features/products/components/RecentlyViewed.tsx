import React from "react";
import { Section } from "../../../shared/components/Section";
import { H2, H3, Body } from "../../../shared/typography";
import type { Product } from "../types";

export function RecentlyViewed({ items }: { items: Product[] }) {
  return (
    <Section marginTop={48}>
      <H2>Recently viewed</H2>

      {items.map((item) => (
        <article key={item.id}>
          <H3>{item.name}</H3>
          <Body>
            {item.currency} {item.price.toFixed(2)}
          </Body>
        </article>
      ))}
    </Section>
  );
}
