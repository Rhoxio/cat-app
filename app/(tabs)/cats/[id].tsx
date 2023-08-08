import { Stack, useSearchParams } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView} from "react-native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { FavoritesProvider, FavoritesContext } from "../../../contexts/favoritesContext";
import { useGetCatByIdQuery } from "../../../services/catsApi"

const CatDetails = () => {
  const {favCat, setFavCat} = useContext(FavoritesContext)
  const [cat, setCat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useSearchParams();

  // This is how you restructure and alias default returns from the
  // query object. 
  const { data: catData, error: catError } = useGetCatByIdQuery(id)

  useEffect(()=>{
    if(catData){
      setCat(catData);
      setIsLoading(false);     
    }

    if (catError) {
      console.log(catError)
    }
  }, [catData, id])

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  function addFavoriteCat(id){
    setFavCat(id)
  }

  function catImageURI(image_id){
    return `https://cdn2.thecatapi.com/images/${image_id}.jpg`
  }

  function isFavoriteCat(catId){
    if (favCat == catId){
      return <Text style={styles.favName}>Name: {cat.name}</Text>      
    } else {
      return <Text style={styles.name}>Name: {cat.name}</Text>  
    }
  }

  return (

    <View>
      <Stack.Screen
        options={{
          title: cat.name,
        }}
      />
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{uri: catImageURI(cat.reference_image_id)}}/>
          {isFavoriteCat(cat.id)}
          <Text style={styles.text}>Origin: {cat.origin}</Text>
          <Text style={styles.text}>Temperament: {cat.temperament}</Text>
          <Text style={styles.text}>Description: {cat.description}</Text>
          <Button title="Fav this cat!" onPress={()=>{
            addFavoriteCat(cat.id)
          }}/>
        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  favName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "gold",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    height: 300,
  }
});

export default CatDetails;