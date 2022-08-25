export const headings = {
  fontFamilies: {
    regular: "TiemposHeadline-Regular",
    bold: "TiemposHeadline-Bold",
    light: "TiemposHeadline-Light",
    black: "TiemposHeadline-Black",
  },
  sizing: {
    extraSmall: {
      fontSize: 14,
      lineHeight: 18,
    },
    small: {
      fontSize: 22,
      lineHeight: 32,
    },
    medium: {
      fontSize: 26,
      lineHeight: 36,
    },
    large: {
      fontSize: 32,
      lineHeight: 44,
    },
    extraLarge: {
      fontSize: 38,
      lineHeight: 52,
    },
  },
};

export const bodyText = {
  fontFamilies: {
    bold: "AvenirLTStd-Black",
    regular: "AvenirLTStd-Roman",
    light: "AvenirLTStd-Book",
  },
  sizing: {
    extraSmall: {
      fontSize: 12,
      lineHeight: 16,
    },
    small: {
      fontSize: 14,
      lineHeight: 18,
    },
    medium: {
      fontSize: 16,
      lineHeight: 22,
    },
    large: {
      fontSize: 18,
      lineHeight: 24,
    },
    extraLarge: {
      fontSize: 20,
      lineHeight: 28,
    },
  },
  spacing: {
    regular: {
      letterSpacing: 0,
    },
    large: {
      letterSpacing: 2,
    },
    extraLarge: {
      letterSpacing: 4,
    },
  },
};

export type HeadingSizingToken = keyof typeof headings.sizing;
export type BodyTextFontFamilyToken = keyof typeof bodyText.fontFamilies;
export type BodyTextSizingToken = keyof typeof bodyText.sizing;
export type BodyTextLetterSpacingToken = keyof typeof bodyText.spacing;

export const typography = {
  headings,
  bodyText,
};
