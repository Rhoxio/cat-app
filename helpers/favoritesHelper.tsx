import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (species: string, data: any) => {
  try {
    const favoritesData = await AsyncStorage.getItem("favorites")
    const savedFavorites = JSON.parse(favoritesData)
    savedFavorites.favorites[species].push(data)

  } catch (e){
    console.log(e)
  }

}

export const clearFavorites = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
  console.log('Done.')  
}

export const initFavoritesStorage = async () => {
  try {
    const newFavorites = {
      "dogs": [],
      "cats": []          
    }
    const favoritesData = await AsyncStorage.getItem("favorites")
    if (favoritesData === null){
      console.log("favorites were empty")
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
      console.log("favorites were set")
    } else {
      return true
    }
  } catch (e) {
    console.log(e)
    return false
  }
}