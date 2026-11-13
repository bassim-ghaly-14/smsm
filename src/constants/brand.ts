/**
 * SMSM brand assets.
 *
 * Single source of truth for the official brand artwork. Every reference to the
 * SMSM logo in application code resolves here so the identity stays consistent
 * and is never scattered as duplicated paths.
 *
 * Source of truth (downloaded once, bundled locally -- never loaded from the
 * network at runtime):
 * https://res.cloudinary.com/paihc5qx/image/upload/v1794567470/SMSM_i0bnqx.png
 *
 * Local copy: assets/images/smsm-logo.png
 */
export const brand = {
  /** Official SMSM logo artwork (vintage microphone symbol + wordmark). */
  logo: require('../../assets/images/smsm-logo.png'),
} as const;
