import { Stack } from "expo-router";
import "../global.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/expo";
import {tokenCache} from "@clerk/expo/token-cache";

const publshableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!  


const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publshableKey} tokenCache={tokenCache} >
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{headerShown:false, contentStyle: { backgroundColor: '#0d0d0f' }  }} >
          <Stack.Screen name="(auth)" options={{animation:"fade"}} />
          <Stack.Screen name="(tabs)" options={{animation:"fade"}} />
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
