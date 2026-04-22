import { Stack } from "expo-router";
import "../global.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/expo";
import {tokenCache} from "@clerk/expo/token-cache";
import AuthSync from "@/components/AuthSync";
import { StatusBar } from "expo-status-bar";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: false,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.reactNativeTracingIntegration({
      traceFetch: true,
      traceXHR: true,
      enableHTTPTimings: true,
    }),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!  


const queryClient = new QueryClient();

export default Sentry.wrap(function RootLayout() {
  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} >
      <QueryClientProvider client={queryClient}>
        <AuthSync />
        <StatusBar style="light" />
        <Stack screenOptions={{headerShown:false, contentStyle: { backgroundColor: '#0d0d0f' }  }} >
          <Stack.Screen name="(auth)" options={{animation:"fade"}} />
          <Stack.Screen name="(tabs)" options={{animation:"fade"}} />
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
});
