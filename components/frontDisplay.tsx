import { useEffect, useState, useContext } from "react";
import { useRouter, Stack } from "expo-router";
import { StyleSheet, Text, View, Button } from "react-native";
import {FavoritesProvider, FavoritesContext} from "../contexts/favoritesContext";


const useFavorites = () => useContext(FavoritesContext)

export default function FrontDisplay(){
  const navigation = useRouter();
  const {favCat, setFavCat} = useFavorites()

  function favoriteCat(){
    if(favCat){
      return <Text style={styles.subtitleGold}>{favCat} is your favorite cat!</Text>
    } else {
      return <Text>You have no favorite animals!</Text>
    }
  }  

  return(
    <FavoritesProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Cat X Dog</Text>
        <Button title="Cats" onPress={() => navigation.push("/cats")} />
        <Button title="Dogs" onPress={() => navigation.push("/dogs")} />
        {favoriteCat()}
      </View> 
    </FavoritesProvider>   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  subtitleGold: {
    fontSize: 16,
    textAlign: "center",
    color: "gold",
    marginTop: 20
  },  
});