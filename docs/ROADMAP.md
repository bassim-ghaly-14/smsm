# SMSM — Implementation Roadmap

This is the primary source of truth for project progress. Update this document when milestones are completed.

## Milestone 0 — Project Foundation (COMPLETED)

**Objective:** Establish a clean, maintainable, production-minded technical foundation for SMSM.

**Tasks:**

- [x] Initialize Expo project (React Native + TypeScript)
- [x] Configure TypeScript strict mode
- [x] Establish folder structure (`app/`, `src/`, `assets/`, `docs/`, `tests/`)
- [x] Configure code quality tools (ESLint, Prettier)
- [x] Establish basic UI shell (home screen with microphone button)
- [x] Verify local development environment
- [x] Document architecture and roadmap

**Dependencies:**

- Node.js v24.10.0, npm v11.6.0
- Expo SDK 54, React Native 0.81.x
- Xcode (for iOS), Java JDK (for Android)

**Expected deliverables:**

- Working Expo project with `expo-router`
- TypeScript strict mode configured
- ESLint + Prettier configured and passing
- `app/_layout.tsx` and `app/index.tsx` UI shell
- `src/types/`, `src/constants/`, `src/store/`, `src/utils/` foundation
- `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/TECHNICAL_DECISIONS.md`, `docs/DEVELOPMENT_GUIDE.md`
- `README.md`

**Acceptance criteria:**

- `npm install` succeeds
- `npm run type-check` passes with zero errors
- `npm run lint` passes with zero errors
- `npm run format` passes with zero issues
- `npm test` passes
- Application starts and initial screen renders

**Potential risks:**

- Expo Router compatibility with SDK 54 — validated and working
- TypeScript 5.x configuration — resolved with standard `expo/tsconfig.base`
- ESLint v9 flat config migration — resolved with `eslint.config.mjs`

**Testing requirements:**

- TypeScript compilation check
- ESLint linting check
- Prettier formatting check
- Visual verification of initial screen

---

## Milestone 1 — First Working Assistant Action

**Objective:** The user can say "Open WhatsApp" and SMSM can recognize the request and attempt to open the supported application.

**Tasks:**

- [ ] Microphone interaction (UI button, recording state)
- [ ] Audio recording (local buffer/file)
- [ ] Speech-to-text integration research and implementation
- [ ] Local transcription
- [ ] Basic intent recognition (rules-based)
- [ ] Application name aliases (e.g., "WhatsApp" → WhatsApp app)
- [ ] Action Registry (allowlisted actions)
- [ ] Platform-specific application opening (Android intents, iOS URL schemes)
- [ ] Error handling and unsupported-app fallback

**Dependencies:**

- Expo Router (already configured)
- Microphone permission (`expo-permissions` or `expo-av`)
- Audio recording library (`expo-av` or `react-native-sound`)
- Speech-to-text library (TBD — Whisper.cpp or platform-native)
- Zod (already installed)

**Expected deliverables:**

- Working microphone button with recording state
- Audio recording capability
- Transcribed text output
- Intent recognition for "open app" commands
- Action Registry with `open_app` action
- Platform-specific app opening code
- Error handling for unsupported apps

**Acceptance criteria:**

- User taps microphone button → recording starts
- User speaks "Open WhatsApp" → text is transcribed
- Intent engine classifies as `open_app` with entity "WhatsApp"
- Action Registry resolves to WhatsApp app
- App opens on Android (Intent) and iOS (URL scheme)
- Error shown if WhatsApp is not installed

**Potential risks:**

- Speech-to-text library selection (Whisper.cpp vs platform-native)
- iOS app discovery limitations (no way to list installed apps)
- Android package name resolution
- Background audio permissions

**Testing requirements:**

- Manual testing on Android device/emulator
- Manual testing on iOS simulator/device
- "Open WhatsApp" voice command end-to-end
- Error case: app not installed

---

## Milestone 2 — Speech Recognition & Intent Engine

**Objective:** Robust speech recognition supporting Arabic, Egyptian Arabic dialect, and English with a production-ready intent engine.

**Tasks:**

- [ ] Evaluate Whisper.cpp integration (native module requirements)
- [ ] Investigate native integration on Android (Kotlin + C++) and iOS (Swift + C++)
- [ ] Arabic speech recognition (Modern Standard Arabic)
- [ ] Egyptian Arabic dialect handling
- [ ] English recognition
- [ ] Text normalization (Arabic/English)
- [ ] Intent classification (rules-based)
- [ ] Entity extraction (app names, contact names, destinations)
- [ ] Alias resolution (alternative names for apps/contacts)
- [ ] Confidence handling (low-confidence transcripts)
- [ ] Ambiguous request clarification (ask user to disambiguate)
- [ ] Unit tests for intent recognition

**Dependencies:**

- Whisper.cpp or platform-native speech recognition
- Native module bridging (Kotlin/Swift + C++ if Whisper.cpp)
- Audio recording pipeline from Milestone 1

**Expected deliverables:**

- Working speech-to-text pipeline
- Arabic and English transcription
- Rules-based intent engine with unit tests
- Entity extraction and alias resolution
- Confidence scoring and low-confidence handling

**Acceptance criteria:**

- Transcription accuracy measured independently from intent accuracy
- Arabic (MSA) commands recognized
- Egyptian Arabic dialect commands recognized
- English commands recognized
- Intent classification unit tests pass
- Low-confidence transcripts handled gracefully

**Potential risks:**

- Whisper.cpp native module complexity
- Model size impact on app bundle size
- Memory usage on older devices
- Egyptian Arabic dialect support in Whisper models

**Testing requirements:**

- Unit tests for intent recognition (Jest or similar)
- Transcription accuracy benchmarks
- Arabic and Egyptian Arabic test cases
- English test cases
- Low-confidence transcript handling

---

## Milestone 3 — Safe Action Architecture

**Objective:** Build a secure, allowlisted action execution framework with validation, permissions, and confirmation.

**Tasks:**

- [ ] Define action types (input/output schemas)
- [ ] Build the Action Registry
- [ ] Define input and output schemas using Zod
- [ ] Implement action validation
- [ ] Implement permission checks
- [ ] Implement confirmation rules (user confirmation before sensitive actions)
- [ ] Implement execution results (success/failure)
- [ ] Implement structured error handling
- [ ] Prevent duplicate or unintended execution

**Dependencies:**

- Zod (already installed)
- Action types from `src/types/index.ts`

**Expected deliverables:**

- Action Registry with registered actions
- Zod validation schemas for all action types
- Permission check middleware
- Confirmation dialog for sensitive actions
- Execution result types
- Structured error handling

**Acceptance criteria:**

- All actions validated against Zod schemas before execution
- Permission checks block execution when required permissions are missing
- Confirmation required for sensitive actions (calls, messages)
- No duplicate execution of the same action
- Structured errors with codes and messages

**Potential risks:**

- Over-engineering the validation layer
- Complex permission state management
- UX friction from confirmation dialogs

**Testing requirements:**

- Unit tests for action validation
- Unit tests for permission checks
- Integration tests for action execution flow

---

## Milestone 4 — Contacts & Calling

**Objective:** Search device contacts, resolve intended contact, and open the native phone dialer.

**Tasks:**

- [ ] Contacts permission flow (Android/iOS)
- [ ] Local contact search
- [ ] Name matching (fuzzy matching for Arabic/English names)
- [ ] Duplicate contact handling
- [ ] Phone number selection (multiple numbers per contact)
- [ ] Native dialer integration (open dialer, do not auto-call)
- [ ] Android/iOS compatibility testing

**Dependencies:**

- Contacts permission (`expo-contacts` or similar)
- Phone dialer integration (`Linking` or native module)

**Expected deliverables:**

- Contact search UI and logic
- Name matching with duplicate handling
- Phone number selection
- Native dialer opening (Android Intent, iOS `tel:` URL)
- Permission denial handling

**Acceptance criteria:**

- Contacts permission requested and handled
- Contact search returns matching results
- Duplicate names handled with disambiguation
- Multiple phone numbers per contact supported
- Dialer opens with selected number (call not auto-placed)
- Works on Android and iOS

**Potential risks:**

- iOS contact access limitations
- Arabic name matching complexity
- Permission denial scenarios

**Testing requirements:**

- Contact search tests
- Permission denial tests
- Dialer opening tests (Android and iOS)
- Duplicate contact handling tests

---

## Milestone 5 — Quran Audio Player

**Objective:** Internal audio player for Quran recitation with background playback support.

**Tasks:**

- [ ] Identify a legally permitted audio source
- [ ] Define the local audio asset strategy
- [ ] Internal audio player (play, pause, resume, seek)
- [ ] Reciter and surah selection
- [ ] Playback state management
- [ ] Background audio investigation and implementation
- [ ] Audio interruption handling (phone calls, other audio)
- [ ] iOS and Android testing

**Dependencies:**

- Audio library (`expo-av` or `react-native-video`)
- Legally permitted Quran audio sources
- Local audio asset strategy

**Expected deliverables:**

- Audio player UI and logic
- Play/pause/resume/seek controls
- Surah and reciter selection
- Background audio (investigation and implementation)
- Audio interruption handling

**Acceptance criteria:**

- Audio plays, pauses, resumes, seeks correctly
- Surah and reciter selection works
- Background audio works (or documented limitation)
- Audio interruption handled gracefully
- No copyrighted content distributed

**Potential risks:**

- Finding legally permitted Quran audio sources
- Background audio implementation complexity (iOS especially)
- Audio file sizes and bundle impact

**Testing requirements:**

- Audio playback tests (Android and iOS)
- Background audio tests
- Interruption handling tests
- Audio performance tests (memory, battery)

---

## Milestone 6 — Application Launcher

**Objective:** Open supported applications via voice commands with aliases and fallbacks.

**Tasks:**

- [ ] Supported application registry
- [ ] Application aliases (alternative names)
- [ ] Android application opening (Intents, package names)
- [ ] iOS URL scheme and Universal Link investigation
- [ ] Unsupported application handling
- [ ] Fallback behavior

**Dependencies:**

- Action Registry from Milestone 3
- Platform-specific app opening mechanisms

**Expected deliverables:**

- App registry with supported applications
- Alias mapping (e.g., "WA" → WhatsApp)
- Android app opening code
- iOS URL scheme investigation results
- Fallback for unsupported apps

**Acceptance criteria:**

- "Open WhatsApp" opens WhatsApp
- Aliases work for common apps
- Unsupported apps show fallback message
- iOS limitations documented (no app discovery API)

**Potential risks:**

- iOS has no way to list installed apps or open arbitrary apps by name
- Android package name changes
- App-specific URL scheme changes

**Testing requirements:**

- App opening tests (Android and iOS)
- Alias resolution tests
- Fallback behavior tests
- Unsupported app handling tests

---

## Milestone 7 — Maps & Navigation

**Objective:** Open maps application with destination from voice command.

**Tasks:**

- [ ] Destination extraction from transcribed text
- [ ] Destination normalization
- [ ] Maps URL generation
- [ ] Google Maps and Apple Maps compatibility
- [ ] Location permissions only when required
- [ ] Ambiguous destination handling
- [ ] Platform-specific fallbacks

**Dependencies:**

- URL generation (no paid Maps SDK)
- Location permission (only when needed)

**Expected deliverables:**

- Destination extraction logic
- Maps URL generation (Google Maps, Apple Maps)
- Platform-specific maps opening
- Location permission flow
- Fallback behavior

**Acceptance criteria:**

- "Navigate to Cairo" opens maps with Cairo destination
- Google Maps (Android) and Apple Maps (iOS) supported
- Location permission only when genuinely needed
- Ambiguous destinations handled with disambiguation

**Potential risks:**

- No billing-dependent Maps SDKs (use URL schemes instead)
- Destination name ambiguity
- Platform-specific URL format differences

**Testing requirements:**

- Maps URL generation tests
- Platform-specific maps opening tests
- Location permission tests
- Ambiguous destination tests

---

## Milestone 8 — Video Search

**Objective:** Search for videos on supported platforms via voice command.

**Tasks:**

- [ ] Video search intent recognition
- [ ] Platform selection (YouTube, etc.)
- [ ] Search URL generation
- [ ] Deep-link support where available
- [ ] Search fallback
- [ ] Unsupported content handling

**Dependencies:**

- No paid video APIs
- URL generation for video platforms

**Expected deliverables:**

- Video search intent handling
- Platform selection logic
- Search URL generation
- Deep-link support (where available)
- Fallback to browser search

**Acceptance criteria:**

- "Search for Quran recitation videos" opens video platform search
- Search query passed correctly
- Fallback when platform not supported
- No paid API dependencies

**Potential risks:**

- Platform URL format changes
- Deep-link availability varies by platform
- Content restrictions on some platforms

**Testing requirements:**

- Video search URL generation tests
- Platform-specific tests
- Fallback behavior tests

---

## Milestone 9 — Quality, Reliability & Performance

**Objective:** Comprehensive testing and optimization across all features.

**Tasks:**

- [ ] Unit tests (all features)
- [ ] Integration tests (critical paths)
- [ ] Device testing (Android and iOS)
- [ ] Arabic and Egyptian Arabic test cases
- [ ] Permission denial scenarios
- [ ] Offline behavior testing
- [ ] Audio performance testing
- [ ] Memory and battery considerations
- [ ] Accessibility testing
- [ ] Error message review
- [ ] Regression testing

**Dependencies:**

- Test framework (Jest, React Native Testing Library)
- All previous milestones completed

**Expected deliverables:**

- Comprehensive test suite
- Device test reports
- Performance benchmarks
- Accessibility audit
- Error message documentation

**Acceptance criteria:**

- Unit tests pass for all features
- Integration tests pass for critical paths
- Arabic and Egyptian Arabic commands work
- Permission denial handled gracefully
- Offline behavior works (local features)
- Accessibility standards met

**Potential risks:**

- Test coverage gaps
- Device-specific issues
- Performance regressions

**Testing requirements:**

- Automated test suite (unit + integration)
- Manual device testing
- Arabic language testing
- Offline mode testing
- Performance profiling

---

## Milestone 10 — MVP Release Preparation

**Objective:** Final acceptance testing and release preparation for local distribution.

**Tasks:**

- [ ] Final acceptance testing
- [ ] Production configuration
- [ ] Android local release build (APK)
- [ ] iOS local build and signing documentation
- [ ] README updates
- [ ] Installation instructions
- [ ] Known limitations documentation
- [ ] Release checklist

**Dependencies:**

- All previous milestones completed
- Android SDK (for APK build)
- Xcode (for iOS build)

**Expected deliverables:**

- Android APK (local build)
- iOS build documentation
- Updated README
- Installation instructions
- Known limitations list
- Release checklist

**Acceptance criteria:**

- All MVP features working
- Android APK installs and runs on device
- iOS build instructions documented
- Installation instructions clear
- Known limitations documented

**Potential risks:**

- iOS Personal Team signing limitations (7-day validity)
- Android build tooling setup
- Distribution limitations (no app stores)

**Testing requirements:**

- Final acceptance testing on physical devices
- Android APK installation test
- iOS personal device installation test

---

## Milestone Completion Checklist

| Milestone                              | Status      | Date Completed | Notes                      |
| -------------------------------------- | ----------- | -------------- | -------------------------- |
| 0 — Project Foundation                 | ✅ Complete | —              | Foundation established     |
| 1 — First Working Assistant Action     | ⬜ Pending  | —              | "Open WhatsApp" end-to-end |
| 2 — Speech Recognition & Intent Engine | ⬜ Pending  | —              | Whisper.cpp evaluation     |
| 3 — Safe Action Architecture           | ⬜ Pending  | —              | Action Registry + Zod      |
| 4 — Contacts & Calling                 | ⬜ Pending  | —              | Contact search + dialer    |
| 5 — Quran Audio Player                 | ⬜ Pending  | —              | Local audio player         |
| 6 — Application Launcher               | ⬜ Pending  | —              | App opening with aliases   |
| 7 — Maps & Navigation                  | ⬜ Pending  | —              | Maps URL generation        |
| 8 — Video Search                       | ⬜ Pending  | —              | Video platform search      |
| 9 — Quality, Reliability & Performance | ⬜ Pending  | —              | Testing and optimization   |
| 10 — MVP Release Preparation           | ⬜ Pending  | —              | Local release builds       |

---

## Document Maintenance Rules

- `docs/ROADMAP.md` is the primary source of truth for project progress.
- Update this roadmap when a milestone is completed.
- Record meaningful architectural changes in `docs/TECHNICAL_DECISIONS.md`.
- Keep `README.md` synchronized with actual implementation status.
- Never assume a feature is complete merely because its directory or interface exists.
- Never silently change the zero-cost requirement.
- Before starting a new milestone, read the relevant project documentation and inspect the existing implementation.
- Do not repeat completed work.
- Do not implement future milestones without explicit instructions.
- Error handling tests
