import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
  } from "react-native";

import { NeuView } from "neumorphism-ui";
import { CheckBox, Icon, Button } from "@rneui/themed";

function ShowList({list, category}) {

  return (
    
    <View style={styles.list}>

        {list.length > 0 ? (
        list.map((item, idx) => {
            return (
            <View style={styles.listInner} key={idx}>
                <Text style={{width : "2%"}}> {idx+1}</Text>
                <TouchableOpacity style={{flex:2}}>
                <NeuView style={styles.Neu}>
                    <Text style={{ opacity: 0.9, color: "white" }}>
                      {item.name}
                    </Text>
                </NeuView>
                </TouchableOpacity>
                <View style={{ flex: 1, padding: 1 }}>
                    <CheckBox
                    center
                    title="Watched"
                    checked={false}
                    //   onPress={() => setCheck1(!check1)}
                    />
                </View>
            </View>
            );
        })
        ) : (
        <Text> Your {category} watchlist is empty 😓 </Text>
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
      padding : 10,
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