import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import {app, db, getFirestore, collection, addDoc, getDocs} from "../firebase/index.js";
import {useEffect, useState} from "react"
import { NeuView } from "neumorphism-ui";
import { useSelector, useDispatch } from "react-redux";
import * as Device from 'expo-device';
import { query, where } from "firebase/firestore";

const categories = ["Anime", "Movies", "TV Series", "Books"];

function Home({navigation}) {

  const dispatch = useDispatch();

  const [allItems, setAllItems] = useState([]);
  const getAllItemsFromFirebase = async() => {
      // const querySnapshot = await getDocs(collection(db, "watchlist"));

    const watchlistRef = collection(db, "watchlist");

     const q = query(watchlistRef, where("deviceId", "==", Device.osBuildFingerprint));
    //  const q = query(watchlistRef, where("category", "==", "Anime"));
     const querySnapshot = await getDocs(q); 

     console.log(q);
     let arr = [];
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj.id = doc.id;
        arr.push(obj);
      });

      console.log("Line 33 at Home.js->", arr);
      setAllItems(arr);
      
      dispatch({type : 'fetchDataForInitialState', allItems : arr});

  }

  useEffect(() => {
  
    getAllItemsFromFirebase();
    
  }, [])
   

  return (
    <View style={styles.home}>
     
      <View style={styles.header}>
        <Text style={{fontSize : 20}}> A Minimalist Watchlist </Text>
      </View>
      <View style={styles.cards}>
        <Text> Categories </Text>
        {categories.map((item, idx) => {
          return (
        
            <View key={idx}>
                <TouchableOpacity onPress={() => navigation.navigate('WatchList', {category : item, allItems : allItems})}>
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
    // backgroundColor : "black"
    justifyContent : "space-between",
  },
  Neu: {
    width: 300,
    height : 100,
    backgroundColor: "#62B3FA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default Home;
