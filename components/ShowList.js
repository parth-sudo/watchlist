import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
  } from "react-native";

import { NeuView } from "neumorphism-ui";
import { CheckBox, Icon, Button } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import {useState, useEffect} from "react";
import Item from "./Item.js";

function ShowList({list, secondaryList, setList, setSecondaryList, category, isShowWatched}) {
    
    const [check, setCheck] = useState(isShowWatched);
    const [checkedShows, setCheckedShows] = useState(new Array(list.length).fill(isShowWatched));
    
    
  return (
    
    <View style={styles.list}>
    
        {list.length > 0 ? (
            list.map((item, idx) => {
                return (
                <View style={styles.listInner} key={idx}>
                  
                      <Item 
                        showObject = {item} 
                        idx = {idx} 
                        title={item.name} 
                        watched={isShowWatched}
                        list = {list}
                        secondaryList = {secondaryList}
                        setList = {setList}
                        setSecondaryList = {setSecondaryList}
                        category = {category}
                      />
   
                </View>
            );
        })
        ) : (
        <Text>  </Text>
        )}
  
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius : 20,
    },
    list: {
      alignItems: "center",
      padding : 3,
      
    },
    listInner : {
      flexDirection : "row",
      alignItems: "center",
    },
    Neu: {
      width: "100%",
      backgroundColor: "blue",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
  });
  

export default ShowList