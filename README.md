# SMSM

**SMSM — Your Voice, Your Actions.**

A voice-controlled mobile assistant for Android and iOS.

## Project Status

**Foundation phase complete.** The project foundation has been established including:

- React Native + Expo (SDK 58) + TypeScript project setup
- Expo Router navigation configured
- ESLint + Prettier + TypeScript strict mode configured
- Feature-oriented folder structure created
- Initial UI shell with microphone button
- Zustand store skeleton for state management
- Zod validation types defined
- Comprehensive documentation (roadmap, architecture, technical decisions, development guide)

**No MVP features have been implemented yet.** The following are planned, not completed:

- Voice recognition and speech-to-text
- Intent recognition engine
- Contact search and calling
- Quran audio player
- Application launcher
- Maps & navigation
- Video search

## Main Product Capabilities (MVP)

1. **Contact & Calling** — Search contacts, resolve names, open phone dialer.
2. **Quran Audio Player** — Internal player for Quran recitation.
3. **Application Launcher** — Open apps via voice (e.g., "Open WhatsApp").
4. **Maps & Navigation** — Open maps with destination.
5. **Video Search** — Search videos on supported platforms.

## Tech Stack

| Layer                | Technology   | Version  |
| -------------------- | ------------ | -------- |
| Framework            | React Native | 0.88.1   |
| Development Platform | Expo         | ^58.0.25 |
| Language             | TypeScript   | ~6.0.3   |
| Navigation           | Expo Router  | ~58.0.31 |
| State Management     | Zustand      | ^5.1.0   |
| Validation           | Zod          | ^3.25.76 |
| Linting              | ESLint       | ^9.0.0   |
| Formatting           | Prettier     | ^3.0.0   |

## Architecture Overview

SMSM follows a **local-first / offline-first** architecture. All processing happens on the device:

```
Microphone → Audio Recording → Local Speech Recognition →
Transcribed Text → Local Intent Engine → Entity Resolution →
Action Registry → Permission/Validation/Confirmation →
Native Action Executor → Result/Error Feedback
```

All actions come from a predefined, validated Action Registry. The assistant never generates arbitrary executable code.

## Setup Instructions

```bash
# Clone the repository
cd /Users/apple9/DOC/SMSM

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Type check
npm run type-check

# Lint
npm run lint

# Format check
npm run format
```

## Current Implementation Status

| Component              | Status             |
| ---------------------- | ------------------ |
| Project foundation     | ✅ Complete        |
| TypeScript strict mode | ✅ Configured      |
| ESLint + Prettier      | ✅ Configured      |
| Expo Router navigation | ✅ Configured      |
| Initial UI shell       | ✅ Complete        |
| Zustand store skeleton | ✅ Created         |
| Type definitions       | ✅ Created         |
| Voice recognition      | ❌ Not implemented |
| Intent engine          | ❌ Not implemented |
| Contacts & calling     | ❌ Not implemented |
| Quran player           | ❌ Not implemented |
| Application launcher   | ❌ Not implemented |
| Maps & navigation      | ❌ Not implemented |
| Video search           | ❌ Not implemented |

## Roadmap

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the complete implementation roadmap organized into 11 milestones.

See [`docs/RELEASES.md`](./docs/RELEASES.md) for the CI/CD release pipeline documentation.

## Zero-Cost Development Philosophy

SMSM is developed with a **zero-cost** constraint:

- ❌ No paid APIs (OpenAI, paid LLM APIs, paid transcription)
- ❌ No subscription services
- ❌ No paid backend hosting (Supabase, Firebase paid)
- ❌ No paid databases
- ❌ No paid build services (EAS cloud builds)
- ❌ No mandatory credit-card registrations
- ✅ Local-first / offline-first processing
- ✅ Free local development and builds
- ✅ Open-source dependencies only

## Platform Limitations

### Android

- Local APK generation and direct installation supported.
- Google Play publishing not part of zero-cost plan (developer registration requires fee).

### iOS

- Local development and testing using Xcode.
- Personal device testing using free Apple account signing.
- Personal Team signing: provisioning profiles valid for 7 days, must be renewed.
- Official App Store distribution not part of zero-cost plan (requires paid Apple Developer Program membership).

## License

MIT License — see LICENSE file.
