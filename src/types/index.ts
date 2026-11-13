/**
 * Shared TypeScript types for SMSM.
 * All source code, comments, identifiers, and documentation are in English.
 */

/**
 * Represents the possible states of the voice interaction pipeline.
 */
export type VoiceState =
  'idle' | 'recording' | 'processing' | 'transcribing' | 'executing' | 'error' | 'success';

/**
 * Represents the possible states of an assistant request.
 */
export type AssistantRequestState = 'idle' | 'pending' | 'completed' | 'failed';

/**
 * Represents a recognized intent from the local intent engine.
 */
export interface RecognizedIntent {
  /** Unique identifier for the intent type. */
  type: string;
  /** Confidence score between 0 and 1. */
  confidence: number;
  /** Extracted entities from the transcribed text. */
  entities: Record<string, string>;
  /** Original transcribed text. */
  transcript: string;
}

/**
 * Represents an action execution result.
 */
export interface ActionResult {
  /** Whether the action was successfully executed. */
  success: boolean;
  /** Human-readable message for the user. */
  message: string;
  /** Optional error details. */
  error?: string;
  /** Platform-specific action data. */
  data?: Record<string, unknown>;
}

/**
 * Represents a registered action in the Action Registry.
 */
export interface RegisteredAction {
  /** Unique action identifier (e.g., "open_app", "call_contact"). */
  id: string;
  /** Human-readable name. */
  name: string;
  /** Platforms where this action is supported: "ios", "android", or "both". */
  platforms: ('ios' | 'android' | 'both')[];
  /** Whether user confirmation is required before execution. */
  requiresConfirmation: boolean;
  /** Whether a permission check is required before execution. */
  requiresPermission: boolean;
  /** Optional permission name required (e.g., "contacts", "location"). */
  permission?: string;
}

/**
 * Permission state for a given permission type.
 */
export interface PermissionState {
  /** Whether the permission has been requested. */
  requested: boolean;
  /** Whether the permission is currently granted. */
  granted: boolean;
  /** Whether the permission is permanently denied (cannot be requested again). */
  permanentlyDenied: boolean;
}

/**
 * Supported languages for the application interface.
 */
export type SupportedLanguage = 'en' | 'ar';

/**
 * Application-wide error with structured information.
 */
export interface AppError {
  code: string;
  message: string;
  recoverable: boolean;
  context?: Record<string, unknown>;
}
