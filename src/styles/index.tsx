import { createStitches } from "@stitches/react";

export const {
  config,
  css,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: "#FFF",

      gray900: "#121214",
      gray800: "#202024",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green500: "#00875f",
      green300: "#00b37e",

      principal:'#00875F',
      light:'#00B37E',

      gray1: '#121214',
      gray2: '#202024',
      gray3: '#8D8D99',
      gray4: '#C4C4CC',
      gray5: '#E1E1E6',
    },

    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
  },
});
