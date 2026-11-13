import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>SMSM</Text>
        <Text style={styles.appSubtitle}>Your Voice, Your Actions.</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.micButton}
          accessible
          accessibilityLabel="Microphone"
          accessibilityHint="Tap to speak a command"
          accessibilityRole="button"
        >
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
        <Text style={styles.micLabel}>Tap and speak</Text>
      </View>

      <View style={styles.feedback}>
        <Text style={styles.feedbackLabel}>Assistant feedback</Text>
        <Text style={styles.feedbackValue}>Idle</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  micIcon: {
    fontSize: 44,
  },
  micLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  feedback: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 24,
  },
  feedbackLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  feedbackValue: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },
});
