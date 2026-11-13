import { Slot } from 'expo-router';
import { StatusBar, SafeAreaView } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors } from '../src/constants/design';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Slot />
      </SafeAreaView>
    </>
  );
}
