import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {app, db, getFirestore, collection, addDoc, getDocs} from "../firebase/index.js";
import {useEffect, useState} from "react"
import { NeuView } from "neumorphism-ui";
import { useSelector, useDispatch } from "react-redux";

const categories = ["Anime", "Movies", "TV Series", "Books"];

function Home({navigation}) {

  const dispatch = useDispatch();

  const [allItems, setAllItems] = useState([]);
  const getAllItemsFromFirebase = async() => {
      const querySnapshot = await getDocs(collection(db, "watchlist"));
      
      let arr = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        arr.push(obj);
      });

      // setAllItems(arr);
      dispatch({type : 'fetchDataForInitialState', allItems : arr});

  }

  useEffect(() => {
    // console.log("Line 21 at Home");
    getAllItemsFromFirebase();
    // console.log(allItems);
  }, [])
   

  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <Text> A minimalist Watchlist </Text>
      </View>
      <View style={styles.cards}>
        <Text> Categories </Text>
        {categories.map((item, idx) => {
          return (
        
            <View key={idx}>
                <TouchableOpacity onPress={() => navigation.navigate('WatchList', {category : item})}>
                <NeuView style={styles.Neu}>
                    <Text style={{ opacity: 0.9, color: "white" }}>{item}</Text>
                </NeuView>
              </TouchableOpacity>
            </View>
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 60,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    flex: 1,
    // backgroundColor
  },
  cards: {
    flex: 3,
    alignItems: "center",
  },
  Neu: {
    width: 300,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default Home;
