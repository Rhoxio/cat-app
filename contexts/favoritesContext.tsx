import React, {useState, createContext, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextValue {
  favCat: string;
  setFavCat: React.Dispatch<React.SetStateAction<string>>;
}

const INITIAL_ID = "abys"
const CAT_KEY = "cat"

export const FavoritesContext = createContext<FavoritesContextValue>({
  favCat: INITIAL_ID,
  setFavCat: () => {
    console.log("FavoritesProvider is not wrapping the component.")
  },
});

export const FavoritesProvider: FC = ({children}) => {
  const [favCat, setFavCat] = useState<string>(INITIAL_ID)

  const fetchFavoriteCat = async () =>{
    try{
      const value = await AsyncStorage.getItem(CAT_KEY)
      if(value){
        setFavCat(value)
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  }

  const setFavoriteCat = async () => {
    try{
      if (favCat !== INITIAL_ID) {
        await AsyncStorage.setItem(CAT_KEY, favCat);
      }
    } catch (error){
      console.error('Error storing data to AsyncStorage:', error);
    }
  }

  useEffect(()=>{
    setFavoriteCat()
  }, [favCat])  

  useEffect(()=>{
    fetchFavoriteCat()
  }, [])

  return (
    <FavoritesContext.Provider value={{favCat, setFavCat}}>
      {children}
    </FavoritesContext.Provider>
  )
}