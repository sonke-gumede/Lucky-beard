import React from "react";

export function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);

  return (
    <span aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rounded)}
      {"☆".repeat(5 - rounded)}
    </span>
  );
}
