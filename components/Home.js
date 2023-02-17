import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import {app, db, getFirestore, collection, addDoc, getDocs} from "../firebase/index.js";
import React, {useEffect, useState} from "react"
import { NeuView } from "neumorphism-ui";
import { useSelector, useDispatch } from "react-redux";
import * as Device from 'expo-device';
import { query, where } from "firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';


const categories = ["Anime", "Movies", "TV Series", "Books"];

function Home({navigation}) {

  const dispatch = useDispatch();

  const [allItems, setAllItems] = useState([]);
  const [fetchBool, setFetchBool] = useState(false);

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

      arr.sort((a, b) => a.index - b.index);

      console.log("Line 33 at Home.js->", arr);
   
      setAllItems(arr);
      
      dispatch({type : 'fetchDataForInitialState', allItems : arr});

  }

  useEffect(() => {
  
    getAllItemsFromFirebase();
    
  }, [fetchBool])

  useFocusEffect(
    React.useCallback(() => {
      // console.log("Chuklanion sucks ass");
      getAllItemsFromFirebase();
    }, [])
  );
   

  return (
    <View style={styles.home}>
     
      <View style={[styles.header, styles.topShadow]}>
        <View></View>
        <TouchableOpacity onPress={() => setFetchBool(!fetchBool)}>
        <Text style={styles.headerFont}> Minimalist Watchlist </Text>
        </TouchableOpacity>
        <Text style={{margin : 10, fontSize:13, color:'#007124', fontFamily :"sans-serif-condensed"}}> A watchlist designed to be simple, if not simpler. </Text>
      </View>
      <View style={styles.cards}>
        <View></View>
        <View></View>
        <Text style={styles.headerFont}> Categories </Text>
        {categories.map((item, idx) => {
          return (
        
            <View key={idx}>
                <TouchableOpacity onPress={() => navigation.navigate('WatchList', {category : item, allCategoryItems : allItems.filter((show) => show.category === item)})}>
                <NeuView style={styles.Neu}>
                    <Text style={{ fontSize : 20, color: "#FFF", fontFamily: "sans-serif-light"}}>{item}</Text>
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
    backgroundColor: "#FFF", 
    padding: 60,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    flex: 1,
    backgroundColor:'#D8E9A8', 
    width: "110%",
    borderRadius : 10,
    borderRadiusWidth :2,
    alignItems:"center",
    justifyContent : "space-around",
    marginTop : 20,

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
    backgroundColor: "#1A3883",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  headerFont : {
    fontSize : 20, 
    color : "#007124",
    fontFamily : "sans-serif-thin"
  },
  topShadow : {
    shadowOffset : {
      width : -6,
      height : -6,
    },
    shadowOpacity : 1,
    shadowRadius: 6,
    shadowColor : "#FBFFF"
  }
});

export default Home;
