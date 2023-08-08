import { Tabs, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  return (
    <>
    <Stack.Screen
      options={{
        title: "Animals"
      }}
    />
    <Tabs>
      <Tabs.Screen
        name="cats"
        options={{
          title: "Cats",
          headerShown: false,
          tabBarIcon: () => <Text>🐱</Text>,
        }}
      />
      <Tabs.Screen
        name="dogs"
        options={{
          title: "Dogs",
          headerShown: false,
          tabBarIcon: () => <Text>🐶</Text>,
        }}
      />
    </Tabs>
    </>
  );
}