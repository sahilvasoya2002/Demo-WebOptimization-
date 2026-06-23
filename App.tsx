import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { AppNavigator } from './src/navigation/AppNavigator';
import { store } from './src/store/index';
import { colors } from './src/theme/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <View style={styles.root}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ErrorBoundary>
              <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
              <AppNavigator />
            </ErrorBoundary>
          </SafeAreaProvider>
        </QueryClientProvider>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
