import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useGetCatsQuery } from "../../../services/catsApi"

const Cats = () => {
  const [search, setSearch] = useState("")
  const [cats, setCats] = useState([]);
  const [searchedCats, setSearchedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 100
  const { data: catsData, error: catsError } = useGetCatsQuery(limit)

  useEffect(() => {
    if(catsData){
      setCats(catsData)
      setSearchedCats(catsData)
      setIsLoading(false)
    }
  }, [catsData, limit]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }  

  const searchFilter = (text: string) =>{

    if(text){
      const filteredCats = cats.filter(function(cat){
        const name = cat.name.toLowerCase()
        const matches = name.includes(text.toLowerCase())
        if(matches){ return cat }
      })
      
      if (filteredCats.length > 0){
        setSearchedCats(filteredCats)
      }
    } else {

    }

    setSearch(text)
  }

  const renderItem = ({ item }: { item: any }) => (
    <Link href={`/cats/${item.id}`} asChild>
      <Pressable style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
      </Pressable>
    </Link>
  );



  return (
    <View>
      <Stack.Screen options={{ title: "Cats" }} />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />      
        <FlatList
          data={searchedCats}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
      />
    </View>
  );
};

export default Cats;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },  
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'blue',
    backgroundColor: '#FFFFFF',
  },
});