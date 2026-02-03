import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuthContext } from '../components/AuthProvider';
import { NotificationProvider } from '../components/NotificationProvider';
import { OfflineProvider } from '../components/OfflineProvider';
import { SyncStatusBanner } from '../components/ui/SyncStatusBanner';
import { useTripStore } from '../stores/tripStore';

function RootLayoutNav() {
  const { isAuthenticated, initialized, loading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();
  const hydrateFromOffline = useTripStore((state) => state.hydrateFromOffline);
  const isHydrated = useTripStore((state) => state.isHydrated);

  // Hydrate trips from offline storage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromOffline();
    }
  }, [isHydrated, hydrateFromOffline]);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboarding = segments[0] === 'onboarding';
    const inIndex = (segments as string[]).length === 0 || segments[0] === undefined;

    // Allow access to index (splash) screen
    if (inIndex) return;

    // If user is not authenticated and not in auth/onboarding screens, redirect to login
    if (!isAuthenticated && !inAuthGroup && !inOnboarding) {
      router.replace('/auth/login');
    }
    
    // If user is authenticated and in auth screens, redirect to main app
    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, initialized, segments]);

  // Show loading screen while initializing
  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <SyncStatusBanner position="top" autoHide={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0a0a0a' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen
          name="create"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="trip/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <OfflineProvider autoSync={true} syncOnForeground={true} syncOnMount={true}>
          <RootLayoutNav />
        </OfflineProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
