import { Slot } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </>
  );
}
