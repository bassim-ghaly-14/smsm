import { useFonts } from 'expo-font';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSMSMStore } from '@/store';
import { colors, fonts, motion, shadow, spacing, typeScale } from '../src/constants/design';

// Local microphone silhouette (replaces the microphone emoji).
// Stored at assets/images/smsm-microphone.png — never loaded from Cloudinary at runtime.

const MIC_SIZE_MIN = 180;
const MIC_SIZE_MAX = 220;
const IMAGE_HEIGHT_RATIO = 0.82;

export default function HomeScreen() {
  // Keep custom text off-screen until the bundled fonts are ready so the app
  // never paints with a system fallback and then re-layouts.
  const [loaded, loadError] = useFonts({
    [fonts.heading]: require('../assets/fonts/SpaceGrotesk-Variable.ttf'),
    [fonts.body]: require('../assets/fonts/Inter-Variable.ttf'),
  });
  const fontsReady = loaded || !!loadError;

  const { width } = useWindowDimensions();
  const micSize = Math.min(MIC_SIZE_MAX, Math.max(MIC_SIZE_MIN, width * 0.58));
  const imageHeight = micSize * IMAGE_HEIGHT_RATIO;

  const micButtonStyle = {
    width: micSize,
    height: micSize,
    borderRadius: micSize / 2,
  };

  const voice = useSMSMStore((state) => state.voice);

  const [reducedMotion, setReducedMotion] = useState(false);

  // --- Animated values -----------------------------------------------------
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const micOpacity = useRef(new Animated.Value(0)).current;
  const micEnterY = useRef(new Animated.Value(22)).current;
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const breathScale = useRef(new Animated.Value(1)).current;
  const statusOpacity = useRef(new Animated.Value(1)).current;

  const breathMounted = useRef(false);
  const statusMounted = useRef(false);

  // Respect the system reduced-motion preference.
  useEffect(() => {
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => setReducedMotion(enabled),
    );
    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);
    return () => subscription.remove();
  }, []);

  // Staggered entrance animation: brand -> mic -> feedback.
  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: motion.durationBase,
      useNativeDriver: true,
    }).start();
    Animated.timing(micOpacity, {
      toValue: 1,
      duration: motion.durationBase,
      delay: 140,
      useNativeDriver: true,
    }).start();
    Animated.timing(micEnterY, {
      toValue: 0,
      duration: motion.durationSlow,
      delay: 140,
      easing: motion.ease,
      useNativeDriver: true,
    }).start();
    Animated.timing(feedbackOpacity, {
      toValue: 1,
      duration: motion.durationBase,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Gentle idle breathing pulse on the microphone image. Stops on unmount.
  useEffect(() => {
    breathMounted.current = true;
    if (reducedMotion) return;
    const run = () => {
      if (!breathMounted.current) return;
      Animated.sequence([
        Animated.timing(breathScale, {
          toValue: 1.06,
          duration: 3400,
          useNativeDriver: true,
        }),
        Animated.timing(breathScale, {
          toValue: 1,
          duration: 3400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (breathMounted.current) run();
      });
    };
    run();
    return () => {
      breathMounted.current = false;
    };
  }, [breathScale, reducedMotion]);

  // Smooth fade when the assistant status changes.
  useEffect(() => {
    if (!statusMounted.current) {
      statusMounted.current = true;
      return;
    }
    Animated.sequence([
      Animated.timing(statusOpacity, {
        toValue: 0,
        duration: motion.durationFast / 2,
        useNativeDriver: true,
      }),
      Animated.timing(statusOpacity, {
        toValue: 1,
        duration: motion.durationFast,
        useNativeDriver: true,
      }),
    ]).start();
  }, [voice, statusOpacity, statusMounted]);

  const onMicPressIn = () => {
    if (reducedMotion) return;
    Animated.timing(pressScale, {
      toValue: 0.955,
      duration: motion.durationFast / 2,
      useNativeDriver: true,
    }).start();
  };
  const onMicPressOut = () => {
    if (reducedMotion) return;
    Animated.timing(pressScale, {
      toValue: 1,
      duration: motion.durationFast / 2,
      useNativeDriver: true,
    }).start();
  };

  // Settings is reserved for a future milestone; pressing is acknowledged
  // tactically but performs no navigation in this design milestone.
  const onSettingsPress = () => {
    if (reducedMotion) return;
  };


  const STATUS_LABELS: Record<string, string> = {
    idle: 'Idle',
    recording: 'Listening\u2026',
    processing: 'Processing',
    transcribing: 'Transcribing',
    executing: 'Executing',
    success: 'Done',
    error: 'Error',
  };
  const statusLabel = useMemo(
    () => STATUS_LABELS[voice] ?? STATUS_LABELS.idle,
    [voice],
  );

  const micContainerAnimated = useMemo(
    () => ({
      opacity: micOpacity,
      transform: [{ translateY: micEnterY }, { scale: pressScale }],
    }),
    [micOpacity, micEnterY, pressScale],
  );
  const micImageAnimated = useMemo(
    () => ({ transform: [{ scale: breathScale }] }),
    [breathScale],
  );

  if (!fontsReady) {
    return (
      <Animated.View style={[styles.splash, { opacity: headerOpacity }]}>
        <Text style={styles.splashBrand}>SMSM</Text>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.brandArea}>
          <Animated.Text
            style={[typeScale.brand, { opacity: headerOpacity }]}
            numberOfLines={1}
          >
            SMSM
          </Animated.Text>
          <Text style={styles.tagline}>Your Voice, Your Actions.</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          activeOpacity={0.7}
          onPress={onSettingsPress}
          accessibilityLabel="Settings"
          accessibilityHint="Open settings"
        >
          <Text style={styles.settingsLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.micButton, micButtonStyle, micContainerAnimated]}
          activeOpacity={0.85}
          onPressIn={onMicPressIn}
          onPressOut={onMicPressOut}
          accessible
          accessibilityLabel="Microphone"
          accessibilityHint="Tap and speak a command"
          accessibilityRole="button"
        >
          <Animated.Image
            style={[styles.micImage, { height: imageHeight }, micImageAnimated]}
            source={require('../assets/images/smsm-microphone.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={[typeScale.micLabel, styles.micLabelText]}>Tap and speak</Text>
      </View>

      <View style={styles.feedbackWrapper}>
        <Animated.View style={[styles.feedback, { opacity: statusOpacity }]}>
          <Text style={[typeScale.sectionLabel, styles.feedbackLabel]}>
            Assistant feedback
          </Text>
          <Text style={[typeScale.statusValue, styles.feedbackValue]}>
            {statusLabel}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splash: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashBrand: {
    ...typeScale.brand,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  brandArea: {
    flex: 1,
  },
  tagline: {
    ...typeScale.body,
    marginTop: spacing.xs,
  },
  settingsButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    // Avoid overlapping the brand heading on narrow screens.
    maxWidth: '30%',
  },
  settingsLabel: {
    ...typeScale.sectionLabel,
    color: colors.violet,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  micButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.violetBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadow.soft,
    overflow: 'hidden',
  },
  micImage: {
    resizeMode: 'contain',
  },
  micLabelText: {
    ...typeScale.micLabel,
  },
  feedbackWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  feedback: {
    alignItems: 'center',
  },
  feedbackLabel: {
    ...typeScale.sectionLabel,
    marginBottom: spacing.xs,
  },
  feedbackValue: {
    ...typeScale.statusValue,
  },
});

