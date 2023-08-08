import { useRouter, Stack } from "expo-router";
import { StyleSheet, Text, View, Button } from "react-native";
import {saveFavorite, initFavoritesStorage, clearFavorites} from "@/helpers/favoritesHelper"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {FavoritesProvider, FavoritesContext} from "../contexts/favoritesContext";
import FrontDisplay from "../components/frontDisplay"

  

const WelcomeScreen = () => {
  const navigation = useRouter();
  // const [favCat, setFavCat] = useContext(FavoritesContext)
  const { getItem, setItem } = useAsyncStorage('favorite-cat');
  

  // const readItemFromStorage = async () => {
  //   const item = await getItem();
  //   setFavCat(item);
  // };  

  useEffect(()=>{
    // readItemFromStorage()
  }, [])

  return (
      <>
      <Stack.Screen
        options={{
          title: "Welcome"
        }}
      />
     <FrontDisplay/>
     </>

  );
};

export default WelcomeScreen;