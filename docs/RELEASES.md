# SMSM Release Documentation

This document explains the CI/CD pipeline, release types, and platform-specific distribution details.

--- 

### Development

- **How to trigger builds**: Every push to the `master` branch automatically starts a GitHub Actions workflow. You can also manually trigger a workflow from the Actions tab using the `Run workflow` button (`workflow_dispatch`).
- **How to read workflow status**: Visit the **Actions** tab on GitHub. Each workflow run shows:
  - **Quality checks** (TypeScript, ESLint, Expo Doctor)
  - **Android build** (release APK production or validation-only if no signing key)
  - **iOS simulator build** (simulator `.app` artifact, macOS-only)
- **How to download GitHub Actions artifacts**: After a successful workflow run, go to the **Actions** page, select the run, and click the **Artifacts** dropdown to download the Android APK or iOS simulator `.app`.
- **Artifact retention**: Artifacts are retained for 30 days. After that, they are automatically deleted by GitHub. Download and archive any artifacts you need long-term.

--- 

### Android

- **How to create the stable signing keystore** (local developer setup):
  1. Generate a stable release keystore using keytool:
     ```bash
     keytool -genkeypair        -alias smsm-key        -keyalg RSA        -keysize 2048        -validity 10950        -keystore android/app/smsm-release-keystore.jks        -dname "CN=SMSM, O=Your Organization, C=US"        -storepass <PASSWORD>        -keypass <KEY_PASSWORD>
     ```
  2. **Never commit this file or the passwords.** Add the base64-encoded keystore to GitHub secrets:
     ```bash
     base64 -i android/app/smsm-release-keystore.jks > encoded.txt
     # Add to GitHub repository secrets:
     # ANDROID_KEYSTORE_BASE64 = <base64 content>
     # ANDROID_KEYSTORE_PASSWORD = <your keystore password>
     # ANDROID_KEY_ALIAS = smsm-key
     # ANDROID_KEY_PASSWORD = <your key password>
     ```
  3. **Update the `scripts/prepare-android-signing.js`** if the generated `build.gradle` structure changes.
  4. **Future updates preserve signing identity**: The same release keystore is used for all future releases. The APK will install over earlier releases as long as the signing certificate remains the same.

- **How to download the APK**: After a successful production-branch push, the Android APK is uploaded as a GitHub Actions artifact named `SMSM-Android`. Download it from the Actions run page.

- **How friends install the APK**:
  1. Transfer the `.apk` file to the Android device (via email, messenger, or direct download).
  2. Tap the APK file and select **Install**.
  3. If installation is blocked, go to **Settings > Security** and enable **Install unknown apps** for the browser/file manager used.
  4. Future updates will install automatically over the existing app because they share the same signing key package name (`com.smsm.app`).

- **What happens if the signing key is lost**: If the release keystore is lost, new APKs cannot install over existing ones (they would have a different signing identity). This would require a new application ID or a manual version bump with user consent. **Backup the keystore and passwords in a secure offline location**.

--- 

### iOS

- **What the simulator build provides**: The iOS workflow runs on a macOS GitHub-hosted runner and builds a simulator-compatible `.app` bundle using Xcode. This proves the app compiles correctly with the current dependency versions. It is **not** an installable physical-device IPA.

- **Why it is not an installable physical-device IPA**: Apple requires valid code signing certificates and provisioning profiles to produce an `.ipa` for physical iOS devices. The free GitHub Actions macOS runners do not include Apple Developer membership credentials, and the project does not include any signing configuration. The `.app` artifact can only run within the iOS Simulator included with Xcode on the runner.

- **Which Apple credentials are required for each distribution route**:
  - **Development-signed builds**: Apple Developer membership ($99/year) + signing certificate + provisioning profile.
  - **Ad Hoc distribution**: Apple Developer membership + Ad Hoc provisioning profile + device UDIDs registered.
  - **TestFlight**: Apple Developer membership + App Store Connect setup + TestFlight builds.
  - **App Store distribution**: Apple Developer membership + App Store Connect submission + review process.
  - Since the user does not authorize paying for Apple Developer membership, the workflow currently only supports simulator builds. To enable physical-device distribution, the Apple Developer membership would need to be acquired and signing credentials configured (outside the free scope of this pipeline).

- **How the workflow can later be extended**: When Apple credentials become available, the `ios-simulator-build` job can be extended to:
  1. Use `codesign` with a development certificate.
  2. Generate an `.ipa` using `xcrun -sdk iphoneos PackageApplication`.
  3. Upload to App Store Connect or TestFlight via API or Application Loader.

--- 

### Version tags and stable releases

When a version tag matching `v*` is pushed (for example, `git tag v1.0.0 && git push origin v1.0.0`), the same CI/CD pipeline runs:
1. Quality checks execute.
2. Android build runs: signed release APK if signing secrets are configured; debug validation APK otherwise.
3. iOS simulator build runs.

A stable GitHub Release is **not** automatically created by the workflow. Artifacts are available as GitHub Actions artifacts from the workflow run. To create a GitHub Release, manually create one from the tagged commit and attach the verified artifacts.

--- 

### GitHub Configuration

- **Required repository secrets** (add via Settings > Secrets and variables > Actions):
  - `ANDROID_KEYSTORE_BASE64` — Base64-encoded release keystore file (only if producing signed Android APKs).
  - `ANDROID_KEYSTORE_PASSWORD` — Keystore password (only if `ANDROID_KEYSTORE_BASE64` is set).
  - `ANDROID_KEY_ALIAS` — Key alias (only if `ANDROID_KEYSTORE_BASE64` is set).
  - `ANDROID_KEY_PASSWORD` — Key password (only if `ANDROID_KEYSTORE_BASE64` is set).

- **Required permissions**: The workflow declares `permissions: contents: read` globally. No job requires `contents: write` because the pipeline publishes Actions artifacts only, not GitHub Releases.

- **Workflow activation steps**:
  1. Push to `master` to trigger the first workflow run.
  2. Visit the **Actions** tab to monitor progress.
  3. Check the **Quality**, **Android**, and **iOS** summary sections.
  4. Download artifacts from successful runs.

- **Workflow activation steps**:
  1. Commit and push `.github/workflows/ci.yml`, `scripts/prepare-android-signing.js`, and `docs/RELEASES.md` to `master`.
  2. (Optional) Add the Android signing secrets if you have a release keystore.
  3. Visit the **Actions** tab to monitor the first workflow run.
  4. Check the **Quality**, **Android**, and **iOS** summary sections.
  5. Download artifacts from successful runs.

--- 

### Cost

- **Free components**: GitHub Actions (public repository), npm dependencies, Node.js, JDK 17, Android SDK (via `android-actions/setup-android`), Expo Prebuild, Expo Doctor, TypeScript, ESLint, Xcode simulator on macOS runners.
- **Cannot be met for free**:
  - Physical-device iOS IPA distribution requires Apple Developer membership ($99/year) — this is outside the free scope.
  - Expo EAS Cloud Build (explicitly prohibited).
  - Any paid CI/CD provider or paid build service.
  - Paid APIs or backend services requiring billing activation.

--- 


### README Update

A concise link has been added to the project README pointing to this documentation. The README now includes platform status truthfully:
- Android: Build pipeline available; signed release APK requires keystore secrets.
- iOS: Simulator build validation only (no physical-device IPA without Apple Developer membership).
- Releases: Artifacts available via GitHub Actions for every push to master and every version tag v*.
