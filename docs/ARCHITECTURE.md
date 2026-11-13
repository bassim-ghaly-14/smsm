# SMSM — Architecture

## Conceptual Pipeline

```
Microphone
    ↓
Audio Recording
    ↓
Local Speech Recognition
    ↓
Transcribed Text
    ↓
Local Intent Engine
    ↓
Entity Resolution
    ↓
Action Registry
    ↓
Permission / Validation / Confirmation
    ↓
Native Action Executor
    ↓
Result / Error Feedback
```

## Pipeline Stages

### 1. Microphone
Captures audio input from the device microphone. Requires microphone permission on both Android and iOS.

### 2. Audio Recording
Stores captured audio locally in a temporary buffer or file. No cloud upload.

### 3. Local Speech Recognition
Converts audio to text using a local speech recognition engine. Whisper.cpp is the preferred candidate subject to technical validation (see `docs/TECHNICAL_DECISIONS.md`).

### 4. Transcribed Text
The raw text output from speech recognition. May contain recognition errors that must be handled gracefully by downstream stages.

### 5. Local Intent Engine
A rules-based engine that classifies the transcribed text into an intent type (e.g., `open_app`, `call_contact`, `play_quran`, `open_maps`, `search_video`). No external AI APIs.

### 6. Entity Resolution
Extracts entities from the transcribed text (e.g., application name, contact name, destination, surah name). Resolves aliases and alternative names.

### 7. Action Registry
A predefined, validated allowlist of actions. All actions must be registered and validated before execution. The assistant never generates arbitrary executable code.

### 8. Permission / Validation / Confirmation
Checks required permissions (contacts, location, microphone, etc.), validates action inputs using Zod schemas, and requests user confirmation for actions that require it (e.g., phone calls).

### 9. Native Action Executor
Executes the action using platform-specific native modules (Kotlin for Android, Swift for iOS). Opens dialer, maps, apps, etc.

### 10. Result / Error Feedback
Returns success or error feedback to the user through the UI.

## Feature Boundaries

| Boundary | Description |
|---|---|
| **Voice Processing** | Entirely local on device. No audio leaves the device. |
| **Intent Recognition** | Rules-based. No external LLM or API calls. |
| **Action Execution** | Allowlisted actions only. No arbitrary code execution. |
| **Local Persistence** | SQLite for local data. No cloud sync. |
| **Native Integration** | Platform-specific modules isolated from shared logic. |

## Service Responsibilities

| Service | Responsibility |
|---|---|
| `src/services/audio` | Audio recording and playback management |
| `src/services/permissions` | Permission request and status checking |
| `src/services/platform` | Platform-specific native bridging |
| `src/features/voice` | Voice interaction UI and state |
| `src/features/assistant` | Intent recognition and action coordination |
| `src/features/contacts` | Contact search and resolution |
| `src/features/quran` | Quran audio player |
| `src/features/apps` | Application launcher |
| `src/features/navigation` | Maps and navigation |
| `src/features/video-search` | Video search |

## State Management

Zustand is used for state management. State slices include:

- **voice**: Voice interaction states (idle, recording, processing, transcribing, executing, error, success)
- **assistant**: Assistant request/response states (idle, pending, completed, failed)
- **permissions**: Permission grant states per permission type
- **errors**: Application error states

## Local Persistence

SQLite (`expo-sqlite`) is the preferred local database. Used for:

- Contact cache (with user consent)
- Application alias mappings
- User preferences
- Action execution history (local only)

No cloud synchronization.

## Native Module Boundaries

Platform-specific behavior is isolated:

- **Android**: Kotlin native modules for contacts, dialer, app launching, Whisper.cpp integration
- **iOS**: Swift native modules for contacts, phone, app launching (URL schemes), Whisper.cpp integration
- **Shared**: TypeScript/JavaScript business logic

## Android and iOS Differences

| Area | Android | iOS |
|---|---|---|
| Opening third-party apps | Package name + Intent | URL scheme + Universal Links |
| Contact access | `READ_CONTACTS` permission | `CNContactStore` access |
| Phone dialer | `Intent.ACTION_DIAL` (opens dialer, no auto-call) | `tel:` URL scheme |
| Background audio | ExoPlayer / MediaPlayer | AVFoundation / AVAudioSession |
| Permissions | Runtime permissions (ActivityResult) | Info.plist + runtime requests |
| Deep links | App links / Intent filters | Universal Links / Custom URL schemes |
| Local audio processing | Native (Kotlin/C++) | Native (Swift/C++) |
| Build and signing | Local APK / AAB | Xcode local build / Personal Team signing |

## Error Handling

- All errors are typed using `AppError` interface with `code`, `message`, `recoverable`, and `context` fields.
- Errors are displayed to the user through the feedback area.
- Recoverable errors allow retry; non-recoverable errors require user action.
- Permission denials are handled gracefully with clear user messaging.

## Security and Permission Principles

1. **Minimum permissions** — Only request permissions when genuinely needed.
2. **No silent actions** — Never place calls, send messages, or perform sensitive actions without explicit user interaction.
3. **Allowlisted actions** — Only predefined, validated actions can be executed.
4. **Local processing** — No audio or user data leaves the device.
5. **Transparent errors** — Users are informed when actions cannot be completed.