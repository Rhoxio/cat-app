import { Stack } from 'expo-router';
import { FavoritesProvider, FavoritesContext } from "@/contexts/favoritesContext";
import { Provider } from 'react-redux';
import { store } from "../store/catStore"
import {SafeAreaView} from "react-native-safe-area-context"

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <FavoritesProvider>
        <Stack 
          screenOptions={{
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome"
          }}
        />
        </Stack>
      </FavoritesProvider>
    </Provider>
  )
}