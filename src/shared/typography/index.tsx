import AppTheme from "../../theme";
import styled from "styled-components";

type TextColor = keyof typeof AppTheme.colors;
type Weight = keyof typeof AppTheme.fonts.weights;

export const H1 = styled.h1<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xxxLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const H2 = styled.h2<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xxLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const H3 = styled.h3<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xLarge,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const H4 = styled.h4<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.large,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const H5 = styled.h5<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.medium,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const H6 = styled.h6<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.small,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const Body = styled.p<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.medium,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.text,
  })
);

export const Caption = styled.span<{ color?: TextColor; weight?: Weight }>(
  ({ theme, color, weight }) => ({
    fontFamily: theme.fonts.family,
    fontSize: theme.fonts.size.xsmall,
    fontWeight: weight
      ? theme.fonts.weights[weight]
      : theme.fonts.weights.regular,
    color: color ? theme.colors[color] : theme.colors.textMuted,
  })
);
