/**
 * Zustand store definitions for SMSM.
 *
 * This file establishes the state management conventions for the project.
 * The actual feature stores will be implemented in subsequent milestones.
 *
 * State slices planned:
 * - voice: Voice interaction states (idle, recording, processing, etc.)
 * - assistant: Assistant request/response states
 * - permissions: Permission grant states
 * - errors: Application error states
 */

import { create } from 'zustand';
import type { VoiceState, AssistantRequestState, PermissionState, AppError } from '@/types';

/**
 * Initial voice state.
 */
const initialVoiceState: VoiceState = 'idle';

/**
 * Initial assistant request state.
 */
const initialAssistantState: AssistantRequestState = 'idle';

/**
 * Base store shape. Feature-specific stores will extend or complement this.
 */
interface SMSMStore {
  voice: VoiceState;
  setVoice: (state: VoiceState) => void;
  assistantState: AssistantRequestState;
  setAssistantState: (state: AssistantRequestState) => void;
  permissions: Record<string, PermissionState>;
  setPermission: (key: string, state: PermissionState) => void;
  errors: AppError[];
  addError: (error: AppError) => void;
  clearErrors: () => void;
}

/**
 * Creates the SMSM store with initial state and actions.
 */
export const useSMSMStore = create<SMSMStore>((set) => ({
  voice: initialVoiceState,
  setVoice: (state: VoiceState) => set({ voice: state }),
  assistantState: initialAssistantState,
  setAssistantState: (state: AssistantRequestState) => set({ assistantState: state }),
  permissions: {},
  setPermission: (key: string, state: PermissionState) =>
    set((prev) => ({
      permissions: { ...prev.permissions, [key]: state },
    })),
  errors: [],
  addError: (error: AppError) =>
    set((prev) => ({
      errors: [...prev.errors, error],
    })),
  clearErrors: () => set({ errors: [] }),
}));
