import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ForgetpwScreen" />
      <Stack.Screen name="ResetpwScreen" />
      <Stack.Screen name="VerifyScreen" />
      <Stack.Screen name="Home" />
    </Stack>
  );
}