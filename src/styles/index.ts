import { createStitches } from "@stitches/react";

export const {
  config,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  styled,
} = createStitches({
  theme: {
    colors: {
      rocketseat: "#8257e6",
      white: '#fff',
      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e'
    },
    fontSizes: {
      md: '18px',
      lg: '20px',
      xl: '24px',
      '2xl': '32px'
    }
  },
});
