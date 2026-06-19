import React from "react";

type Props = {
  children: React.ReactNode;
  marginTop?: number;
  style?: React.CSSProperties;
};

export function Section({ children, marginTop, style }: Props) {
  return <section style={{ marginTop, ...style }}>{children}</section>;
}
