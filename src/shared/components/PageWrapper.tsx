import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  padding?: number;
};

const Main = styled.main<{ $padding: number }>`
  padding: ${({ $padding }) => $padding}px;
`;

export function PageWrapper({ children, padding = 32 }: Props) {
  return <Main $padding={padding}>{children}</Main>;
}
