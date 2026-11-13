/**
 * SMSM design tokens.
 *
 * Single source of truth for color, spacing, typography, border radius,
 * elevation and motion. Values are kept consistent across the whole screen
 * so the visual language feels coherent and intentional.
 */

import type { EasingFunction, TextStyle } from 'react-native';
import { Easing } from 'react-native';

/**
 * Palette.
 * Deep charcoal / near-black surfaces and text, soft violet as an elegant
 * accent (never an overwhelming background), white / off-white surfaces,
 * muted gray for secondary text.
 */
export const colors = {
  background: '#F8F7FC',
  surface: '#FFFFFF',
  surfaceSoft: '#F4F2FA',
  textPrimary: '#15131D',
  textSecondary: '#777386',
  textMuted: '#A7A1B8',
  violet: '#8065D8',
  violetSoft: '#EAE3FA',
  violetBorder: '#C7BCF0',
  charcoal: '#171521',
  border: '#EAE7F0',
} as const;

/**
 * Spacing scale (px).
 */
export const spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 44,
  xxl: 60,
} as const;

/**
 * Border radius. Kept small and intentional — no excessive rounding.
 */
export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
} as const;

/**
 * Font families (bundled locally, see assets/fonts).
 * Inter is used for UI/body text; Space Grotesk for brand/display text.
 * Neither font is English-only: when Arabic support is activated, the
 * application should resolve an Arabic-capable font family here rather than
 * forcing an English-only face onto Arabic text.
 */
export const fonts = {
  heading: 'Space Grotesk',
  body: 'Inter',
} as const;

export type ScaleName =
  | 'brand'
  | 'micLabel'
  | 'sectionLabel'
  | 'statusValue'
  | 'statusLabel'
  | 'body';

/**
 * Type scale. Intentional sizes — nothing is oversized for no reason.
 */
export const typeScale: Record<ScaleName, TextStyle> = {
  brand: {
    fontFamily: fonts.heading,
    fontSize: 40,
    fontWeight: '800' as const,
    letterSpacing: -1,
    lineHeight: 48,
    color: colors.textPrimary,
  },
  micLabel: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.textPrimary,
  },
  sectionLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    color: colors.textSecondary,
  },
  statusValue: {
    fontFamily: fonts.body,
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  statusLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: '500' as const,
    color: colors.textSecondary,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.textSecondary,
    lineHeight: 22,
  },
} as const;

/**
 * Subtle, purposeful elevation. No heavy shadows.
 */
export const shadow = {
  soft: {
    shadowColor: colors.violet,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;

/**
 * Motion constants (ms). Durations are brief so the interface feels lively
 * without being distracting or battery-heavy.
 */
export const motion = {
  durationFast: 160,
  durationBase: 400,
  durationSlow: 640,
  ease: Easing.inOut(Easing.cubic) as EasingFunction,
} as const;
