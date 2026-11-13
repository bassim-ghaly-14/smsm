# SMSM — Project Overview

## Product Vision

SMSM is a voice-controlled mobile assistant for Android and iOS. The user opens the application, taps one microphone button, speaks naturally, and expects the application to understand the request and perform an appropriate action. SMSM is an action-oriented assistant, not merely a conversational chatbot.

## Product Goals

- Enable users to perform common mobile actions through voice commands.
- Support Arabic, Egyptian Arabic dialect, and English with natural phrasing variations.
- Operate with a local-first, offline-first architecture to protect user privacy and eliminate dependency on paid cloud services.
- Provide a safe, allowlisted action execution model — the assistant never generates or executes arbitrary code.

## Target Platforms

- **Android** (first-class target)
- **iOS** (first-class target)

Platform differences are documented in `docs/ARCHITECTURE.md`. Android and iOS capabilities are never assumed to be identical.

## Supported Languages

- **English** (primary)
- **Arabic** (Modern Standard Arabic)
- **Egyptian Arabic dialect** (spoken variant)

The application interface will eventually support Arabic and English. All source code, comments, identifiers, and documentation are written in English.

## Core MVP Features

| Capability | Description |
|---|---|
| **Contact & Calling** | Search device contacts (with permission), resolve intended contact, handle ambiguous names, open native phone dialer with selected number. Never initiates a call without user interaction. |
| **Quran Audio Player** | Internal audio player for Quran recitation playback. Background audio planned. Only legally permitted audio sources. |
| **Application Launcher** | Understand requests such as "Open WhatsApp" and open supported applications via platform-compatible mechanisms. Sensible fallbacks for unsupported apps. |
| **Maps & Navigation** | Understand destination names, open maps application or maps URL, pass destination. Location permission requested only when genuinely necessary. |
| **Video Search** | Understand requests to search for videos, open supported video platforms or search URLs. No dependence on paid platform APIs. |

## First Development Milestone

**Tap microphone → Say "Open WhatsApp" → Recognize the request → Resolve the action → Open the supported application.**

## Explicitly Excluded Features

The following are explicitly out of scope for the MVP and foundation phase:

- Paid APIs or paid backend services of any kind.
- User authentication or accounts.
- Cloud synchronization or remote databases.
- Analytics or monitoring platforms.
- Generative AI that creates executable code.
- Direct phone call placement without user confirmation (opening the dialer is the intended behavior).
- Copyrighted or unauthorized audio/video redistribution.
- Official app store distribution (Google Play requires paid developer registration; Apple App Store requires paid Developer Program membership).

## Zero-Cost Commitment

The entire project must be developed using tools and services that do not require payment. The following are strictly prohibited unless explicitly reconsidered by the user in a future session:

- Paid APIs (OpenAI, paid LLM APIs, paid transcription APIs, etc.)
- Subscription-based services
- Paid AI providers
- Paid backend hosting (Supabase, Firebase paid services, etc.)
- Paid databases
- Paid build services (EAS cloud builds, etc.)
- Mandatory credit-card registrations
- Services that can unexpectedly generate charges
- Any architecture that depends on future paid upgrades

## Main Product Constraints

1. **Zero-cost architecture** — Local-first / offline-first processing on device.
2. **No backend** — All processing happens on the device.
3. **No arbitrary code execution** — All actions come from a predefined, validated allowlist.
4. **Platform-specific native integration** — Android (Kotlin) and iOS (Swift) handled separately.
5. **Whisper.cpp investigation only** — Whisper.cpp integration is documented and investigated, not implemented during the foundation phase.
6. **Rules-based intent engine** — Preferred starting point over local LLMs.