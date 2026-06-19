import React from "react";

type Props = {
  children: React.ReactNode;
  marginTop?: number;
  className?: string;
};

export function Section({ children, marginTop, className }: Props) {
  return (
    <section className={className} style={{ marginTop }}>
      {children}
    </section>
  );
}
