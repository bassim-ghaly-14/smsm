/**
 * Application-wide constants for SMSM.
 */

export const APP_NAME = 'SMSM';
export const APP_TAGLINE = 'Speak Less, Get More';

/**
 * Supported languages for the UI.
 */
export const SUPPORTED_LANGUAGES: { code: string; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
];

/**
 * Default language.
 */
export const DEFAULT_LANGUAGE: 'en' | 'ar' = 'en';

/**
 * Intent types recognized by the local rules-based engine.
 */
export const INTENT_TYPES = {
  OPEN_APP: 'open_app',
  CALL_CONTACT: 'call_contact',
  PLAY_QURAN: 'play_quran',
  OPEN_MAPS: 'open_maps',
  SEARCH_VIDEO: 'search_video',
} as const;

/**
 * Action IDs used in the Action Registry.
 */
export const ACTION_IDS = {
  OPEN_APP: 'open_app',
  CALL_CONTACT: 'call_contact',
  PLAY_QURAN: 'play_quran',
  OPEN_MAPS: 'open_maps',
  SEARCH_VIDEO: 'search_video',
} as const;

/**
 * Platform names.
 */
export const PLATFORMS = {
  IOS: 'ios',
  ANDROID: 'android',
  BOTH: 'both',
} as const;

/**
 * Voice interaction states.
 */
export const VOICE_STATES = {
  IDLE: 'idle',
  RECORDING: 'recording',
  PROCESSING: 'processing',
  TRANSCRIBING: 'transcribing',
  EXECUTING: 'executing',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;
