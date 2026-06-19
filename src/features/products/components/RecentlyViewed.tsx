import React from "react";
import { Section } from "../../../shared/components/Section";
import type { Product } from "../types";

export function RecentlyViewed({ items }: { items: Product[] }) {
  return (
    <Section marginTop={48}>
      <h2>Recently viewed</h2>

      {items.map((item) => (
        <article key={item.id}>
          <h3>{item.name}</h3>
          <p>
            {item.currency} {item.price.toFixed(2)}
          </p>
        </article>
      ))}
    </Section>
  );
}
