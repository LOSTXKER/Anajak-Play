import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import designSystem from "./lib/config/design-system";

const {
  colors: dsColors,
  typography: dsTypography,
  spacing: dsSpacing,
  borderRadius: dsRadius,
  shadows: dsShadows,
  animation: dsAnimation,
} = designSystem;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          neon: dsColors.primary.neon,
          core: dsColors.primary.core,
          violet: dsColors.primary.violet,
        },
        secondary: {
          electric: dsColors.secondary.electric,
          cool: dsColors.secondary.cool,
          midnight: dsColors.secondary.midnight,
        },
        dark: {
          base: dsColors.dark.base,
          card: dsColors.dark.card,
          surface: dsColors.dark.surface,
        },
        text: {
          primary: dsColors.text.primary,
          secondary: dsColors.text.secondary,
          tertiary: dsColors.text.tertiary,
          muted: dsColors.text.muted,
        },
        status: {
          success: dsColors.status.success,
          warning: dsColors.status.warning,
          error: dsColors.status.error,
          info: dsColors.status.info,
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", dsTypography.fonts.heading, "sans-serif"],
        body: ["var(--font-body)", dsTypography.fonts.body, "sans-serif"],
        mono: ["var(--font-mono)", dsTypography.fonts.mono, "monospace"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        button: dsRadius.button,
        card: dsRadius.card,
        modal: dsRadius.modal,
      },
      spacing: {
        cardPadding: dsSpacing.cardPadding,
      },
      boxShadow: {
        card: dsShadows.card,
        cardHover: dsShadows.cardHover,
        "glow-purple": dsShadows.glow.purple,
        "glow-blue": dsShadows.glow.blue,
        "glow-subtle": dsShadows.glow.subtle,
      },
      backgroundImage: {
        "gradient-hero": dsColors.gradients.hero,
        "gradient-button": dsColors.gradients.button,
        "gradient-card": dsColors.gradients.card,
      },
      transitionDuration: {
        fast: dsAnimation.duration.fast,
        normal: dsAnimation.duration.normal,
        slow: dsAnimation.duration.slow,
      },
      keyframes: {
        glow: {
          "0%, 100%": { "box-shadow": dsShadows.glow.subtle },
          "50%": { "box-shadow": dsShadows.glow.purple },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite",
        fadeIn: "fadeIn 0.6s ease-out both",
      },
    },
  },
  plugins: [animatePlugin],
};
export default config;
