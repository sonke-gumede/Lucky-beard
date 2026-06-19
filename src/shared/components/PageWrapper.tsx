import React from "react";

type Props = {
  children: React.ReactNode;
  padding?: number;
};

export function PageWrapper({ children, padding = 32 }: Props) {
  return <main style={{ padding }}>{children}</main>;
}
