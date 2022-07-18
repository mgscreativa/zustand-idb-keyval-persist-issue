import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

import { useHydration, usePersistAppContextStore } from './stores/usePersistAppContextStore';

export default function App() {
    const { fishes, addFish, clearFish, hasHydrated } = usePersistAppContextStore(
    ({ fishes, addFish, clearFish, hasHydrated }) => ({
      fishes,
      addFish,
      clearFish,
      hasHydrated,
    }),
  );
  const hasHydratedFromHook = useHydration();

  if (!hasHydratedFromHook || !hasHydrated) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {`
            hasHydratedFromHook: ${hasHydratedFromHook}
            hasHydrated: ${hasHydrated}
            fishes: ${fishes}
          `}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {`
          hasHydratedFromHook: ${hasHydratedFromHook}
          hasHydrated: ${hasHydrated}
          fishes: ${fishes}
        `}
      </Text>

      <TouchableOpacity
        key="bt1"
        onPress={() => addFish()}
        style={styles.button}>
        <Text>Add Fish</Text>
      </TouchableOpacity>

      <TouchableOpacity
        key="bt1"
        onPress={() => clearFish()}
        style={styles.button}>
        <Text>Clear Fish</Text>
      </TouchableOpacity>

      <Card>
        <AssetExample />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#cccccc',
  },
});
