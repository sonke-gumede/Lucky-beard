import type { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
  cursor: pointer;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0.5rem 1rem;
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  transition: background 0.15s;

  ${({ theme, $variant }) =>
    $variant === "primary"
      ? css`
          background: ${theme.colors.brand};
          color: ${theme.colors.text};
          &:hover {
            background: ${theme.colors.brandDark};
          }
        `
      : css`
          background: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          &:hover {
            background: ${theme.colors.border};
          }
        `}
`;

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return <StyledButton $variant={variant} {...props} />;
}
