import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --color-brand:      ${({ theme }) => theme.colors.brand};
    --color-brand-dark: ${({ theme }) => theme.colors.brandDark};
    --color-text:       ${({ theme }) => theme.colors.text};
    --color-text-muted: ${({ theme }) => theme.colors.textMuted};
    --color-bg:         ${({ theme }) => theme.colors.light};
    --color-surface:    ${({ theme }) => theme.colors.surface};
    --color-border:     ${({ theme }) => theme.colors.border};
    --font-sans:        ${({ theme }) => theme.fonts.family};
    --font-serif:       ${({ theme }) => theme.fonts.heading};
    --radius-sm:        ${({ theme }) => theme.radii.sm};
    --radius-md:        ${({ theme }) => theme.radii.md};
    --shadow-card:      ${({ theme }) => theme.shadows.card};
  }

  body {
    font-family: ${({ theme }) => theme.fonts.family};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.light};
    line-height: 1.5;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
