# SMSM — Technical Decisions

This document records important architectural decisions and their reasoning.

## 1. Why React Native + Expo?

**Decision:** Use React Native with Expo framework (SDK 54).

**Reasoning:**

- Enables cross-platform development for Android and iOS from a single TypeScript codebase.
- Expo provides managed workflow with simplified native module configuration.
- Over-the-air updates (via Expo) are supported for future distribution.
- Large ecosystem of compatible libraries.

**Alternatives considered:**

- **Pure React Native (bare)**: More complex native setup, requires manual configuration of native modules.
- **Flutter**: Would require Dart expertise, different ecosystem.
- **Native (Swift/Kotlin)**: Requires maintaining two separate codebases.

**Trade-off:** Expo managed workflow abstracts some native configuration, but certain advanced native modules may require ejecting to a dev client. This is acceptable for the MVP.

## 2. Why TypeScript?

**Decision:** Use TypeScript with strict mode enabled.

**Reasoning:**

- Catches type errors at compile time, reducing runtime bugs.
- Better IDE support and developer experience.
- Self-documenting code through explicit types and interfaces.
- Required by project coding standards (`no any` unless documented).

**Alternatives considered:**

- **Plain JavaScript**: No type safety, more runtime errors.
- **Flow**: Smaller ecosystem, less IDE support than TypeScript.

**Trade-off:** Slightly more verbose code, but the safety benefits far outweigh the cost.

## 3. Why Local-First?

**Decision:** All processing happens on the device. No backend, no cloud sync.

**Reasoning:**

- **Zero-cost requirement**: No paid backend hosting, no paid databases, no cloud infrastructure.
- **Privacy**: User voice data and contacts never leave the device.
- **Offline capability**: Assistant works without internet connection.
- **Simplicity**: No backend API design, authentication, or database management.

**Alternatives considered:**

- **Backend + cloud sync**: Violates zero-cost requirement, adds complexity.
- **Hybrid (some local, some cloud)**: Still incurs costs and complexity.

**Trade-off:** No multi-device sync, no web dashboard, no server-side processing. All processing limited to device capabilities.

## 4. Why a Rules-Based Intent Engine First?

**Decision:** Start with a local rules-based intent engine instead of an LLM.

**Reasoning:**

- **Zero-cost**: No paid LLM APIs (OpenAI, etc.).
- **Predictable**: Rules are deterministic and easy to debug.
- **Transparent**: Intent classification logic is visible and auditable.
- **Low resource**: Runs entirely on device without GPU/NPU requirements.
- **Sufficient for MVP**: The MVP has a limited, well-defined set of intents.

**Alternatives considered:**

- **Local LLM**: Would require significant device resources, model distribution, and may not be necessary for the MVP's limited intent set.
- **Cloud LLM API**: Violates zero-cost requirement.

**Trade-off:** Less flexible than LLM for understanding novel phrasings. Can be enhanced or replaced in future milestones based on evaluation.

## 5. Why Whisper.cpp Is Being Investigated Rather Than Blindly Integrated

**Decision:** Whisper.cpp is the preferred speech recognition candidate but requires technical validation before integration.

**Reasoning:**

- **Zero-cost**: Open source, no API fees.
- **Local**: Runs entirely on device.
- **Multilingual**: Supports Arabic and English.
- **Uncertainty**: Integration complexity with React Native/Expo (native modules, C++ bridging, model size, memory usage) is not yet proven.

**Plan:**

- Document integration requirements in Milestone 2.
- Evaluate native module bridging (Kotlin/Swift + C++).
- Assess model size and memory impact on target devices.
- Only integrate if technical validation succeeds.

**Trade-off:** If Whisper.cpp proves too complex, alternatives include platform-native speech recognition (Android SpeechRecognizer, iOS SFSpeechRecognizer).

## 6. Why No Paid APIs Are Permitted

**Decision:** Zero-cost architecture is a permanent requirement.

**Reasoning:**

- The user explicitly refuses paid APIs, subscription services, paid AI providers, paid backend hosting, and any service that can unexpectedly generate charges.
- Free trials and limited free tiers are not acceptable.
- The architecture must remain free indefinitely, not just during development.

**Prohibited services:**

- OpenAI API, paid LLM APIs
- Supabase, Firebase paid services
- Paid transcription APIs
- Paid cloud infrastructure
- EAS cloud builds
- Paid analytics/monitoring

## 7. Why No Backend Is Needed for the Initial MVP

**Decision:** The MVP operates entirely on-device with no backend.

**Reasoning:**

- All MVP features (contacts, Quran player, app launcher, maps, video search) can be implemented using device-native capabilities.
- No multi-user features, no data sharing, no server-side processing required.
- Eliminates the need for authentication, API design, database management, and hosting costs.

**Future consideration:** A backend could be considered in future milestones only if a genuine need emerges and a zero-cost solution is available.

## 8. Why Android and iOS Require Separate Native Compatibility Considerations

**Decision:** Platform differences are documented and handled separately.

**Reasoning:**

- **Opening third-party apps**: Android uses Intents/package names; iOS uses URL schemes/Universal Links.
- **Contact access**: Different permission models and APIs.
- **Phone dialer**: Android uses `Intent.ACTION_DIAL`; iOS uses `tel:` URL scheme.
- **Background audio**: Different audio frameworks and session management.
- **Permissions**: Different runtime permission request patterns.
- **Deep links**: Different mechanisms (App links vs Universal Links).
- **Local audio processing**: Different native frameworks and languages (Kotlin vs Swift).
- **Build and signing**: Different build tools, signing requirements, and distribution models.

**Trade-off:** More native code to maintain, but ensures correct behavior on each platform.

## 9. Why Actions Must Use an Allowlisted Registry

**Decision:** All actions must come from a predefined, validated Action Registry.

**Reasoning:**

- **Security**: Prevents arbitrary code execution — a critical safety requirement for a voice-controlled assistant.
- **Predictability**: Every action is known, tested, and documented.
- **Validation**: Zod schemas validate action inputs before execution.
- **Auditability**: The complete set of possible actions is enumerated and reviewable.

**Rule:** The assistant must never generate arbitrary executable code and execute it as an action.
