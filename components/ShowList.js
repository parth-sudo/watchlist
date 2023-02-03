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

function ShowList({list, secondaryList, setList, setSecondaryList, category, isShowWatched}) {

    const [check, setCheck] = useState(isShowWatched);
    const [checkedShows, setCheckedShows] = useState(new Array(list.length).fill(isShowWatched));

    const dispatch = useDispatch(); 

    const updateWatchList = (showObject, idx) => {
     
        const status = showObject.watched;
        
        // update watchlist watched boolean by dispatching.
        dispatch({type:'updateWatchedItems', 
                category : category,
                name : showObject.name, 
                watched : !status});

        let temp = [...checkedShows];
        
        const l = [...list];
        const sl = [...secondaryList];
        //todo.
        // temp[idx] = !temp[idx];

        l.splice(idx, 1);
        sl.push(showObject);

        setList(l);
        setSecondaryList(sl);
        // setCheckedShows(temp);
        // setWatched()
       
        console.log(checkedShows);
    }

    const deleteWatchedShow = (showObject, idx) => {
        const arr = [...list];
        arr.splice(idx, 1);
        setList(arr);
        // todo.
        // dispatch({type:'deleteItem', })
    }


  return (
    
    <View style={styles.list}>
    
        {list.length > 0 ? (
            list.map((item, idx) => {
                return (
                <View style={styles.listInner} key={idx}>
                  
                    <TouchableOpacity style={{flex:2}}>
                        <NeuView style={styles.Neu}>
                            <Text style={{ opacity: 0.9, color: "white" }}>
                            {item.name}
                            </Text>
                        </NeuView>
                    </TouchableOpacity>
                    {!isShowWatched && 
                        <View style={{ flex: 1, padding: 1, marginRight:3 }}>
                        <TouchableOpacity onPress={() => updateWatchList(item, idx)}>
                            <Text style={{fontSize : 15}}> Watched ✅</Text>
                    
                        </TouchableOpacity>
                    </View>
                   }
                   {isShowWatched && 
                        <View style={{ flex: 1, padding: 1 }}>
                        <TouchableOpacity onPress={() => deleteWatchedShow(item, idx)}>
                            <Text style={{fontSize : 15}}> Delete Show</Text>
                        </TouchableOpacity>
                    </View>
                  }
                    
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