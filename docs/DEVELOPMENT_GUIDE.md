# SMSM — Development Guide

## Required Tools

| Tool | Purpose | How to Verify |
|---|---|---|
| Node.js (v24.x) | JavaScript runtime | `node --version` |
| npm (v11.x) | Package manager | `npm --version` |
| Xcode | iOS development and builds | `xcodebuild --version` |
| Java JDK | Android development | `java --version` |
| Git | Version control | `git --version` |
| VS Code | Recommended IDE | — |

## Installation

1. **Clone or open the project:**
   ```bash
   cd /Users/apple9/DOC/SMSM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development Commands

| Command | Purpose |
|---|---|
| `npm start` | Start Expo development server |
| `npm run android` | Start Expo and open on Android emulator/device |
| `npm run ios` | Start Expo and open on iOS simulator/device |
| `npm run web` | Start Expo in web browser |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Check formatting with Prettier |
| `npm run format:write` | Format code with Prettier |
| `npm test` | Run tests (placeholder) |

## Type Checking

```bash
npm run type-check
```

## Linting

```bash
npm run lint
```

## Formatting

```bash
npm run format
npm run format:write  # auto-fix formatting
```

## Testing

```bash
npm test
```

*Note: No test framework is configured yet. Testing will be added in Milestone 2.*

## Android Local Execution

**Prerequisites:**
- Android Studio with Android SDK installed
- ANDROID_HOME environment variable set
- Android emulator or physical device with USB debugging enabled

**Commands:**
```bash
npm run android
```

**Local build (APK):**
```bash
# Requires Android SDK build tools
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

**Zero-cost distribution:** APK can be installed directly on devices or shared. Google Play publishing is not part of the zero-cost plan.

## iOS Local Execution

**Prerequisites:**
- Xcode installed (available on this system)
- Apple ID for Personal Team signing (free)
- iOS Simulator or physical device

**Commands:**
```bash
npm run ios
```

**Local build:**
```bash
npx expo prebuild --platform ios
# Open ios/SMSM.xcworkspace in Xcode
```

**Personal Team signing limitations:**
- Free Apple account can sign apps for personal device testing.
- Provisioning profiles are valid for 7 days and must be renewed.
- Official App Store distribution requires paid Apple Developer Program membership ($99/year).

**Zero-cost distribution:** Ad-hoc installation on personal devices via Xcode. App Store distribution is not part of the zero-cost plan.

## Local Build Limitations

- No EAS cloud builds (paid service).
- Android APK built locally via Gradle.
- iOS app built locally via Xcode.
- No over-the-air updates via Expo's paid services.

## How to Add a Feature

1. Read `docs/ROADMAP.md` to understand the current milestone.
2. Create feature directory under `src/features/<feature-name>/`.
3. Add types to `src/types/index.ts` if needed.
4. Add constants to `src/constants/index.ts` if needed.
5. Add store slice to `src/store/index.ts` if needed.
6. Implement feature components and services.
7. Add tests under `tests/`.
8. Run `npm run type-check`, `npm run lint`, `npm run format`.
9. Update `docs/ROADMAP.md` when the milestone is complete.

## How to Maintain Project Documentation

- `docs/ROADMAP.md` is the primary source of truth for project progress.
- Update the roadmap when a milestone is completed.
- Record meaningful architectural changes in `docs/TECHNICAL_DECISIONS.md`.
- Keep `README.md` synchronized with actual implementation status.
- Never assume a feature is complete merely because its directory or interface exists.
- Never silently change the zero-cost requirement.

## Environment Verification

Run all checks before starting work:

```bash
npm install
npm run type-check
npm run lint
npm run format
npm test
```