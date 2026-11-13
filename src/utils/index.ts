/**
 * Shared utility functions for SMSM.
 */

/**
 * Normalizes a string for comparison: lowercase, trim, remove extra whitespace.
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Checks if a string is empty or whitespace only.
 */
export function isEmpty(value: string | undefined | null): value is '' {
  return value === undefined || value === null || value.trim() === '';
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Formats a platform-specific error message.
 */
export function formatErrorMessage(code: string, message: string): string {
  return `[${code}] ${message}`;
}
