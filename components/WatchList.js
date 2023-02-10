import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ShowList from "./ShowList";
import {app, db, getFirestore, collection, addDoc, getDocs, updateDoc} from "../firebase/index.js";
import * as Device from 'expo-device';

export default function WatchList({ navigation, route }) {

  const [category, setCategory] = useState(route.params.category);
  const [check, setCheck] = useState(false);
  const [showName, setShowName] = useState("");
  const [searchedShow, setSearchedShow] = useState("");
  const [unwatchedList, setUnwatchedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const itemList = useSelector(
    (state) => state.filter((obj) => obj.category === category)
  );

  useEffect(() => {
    // console.log(itemList);
    // console.log(category);
    let itemListNames = [];
    itemList.forEach((item) => {
      itemListNames.push(item.name);
    });
    console.log("item list of watchlist screen::::", itemListNames);
    
    const unWatched = [...itemList.filter((obj) => obj.watched === false)];
    const watched = [...itemList.filter((obj) => obj.watched === true)];
    const curUnwatched = [...unwatchedList];
    curUnwatched.concat(unWatched);
    console.log("Current Unwatched->", unWatched);
    setUnwatchedList(unWatched);
    setWatchedList(watched);
    
  }, []);

  var textInputRef = React.createRef();
  const dispatch = useDispatch();

  const addShowToListInFirebase = async() => {

    const str = showName;

    if(!str) {
      Alert.alert("Your show name cannot be empty.");
      return;
    }
    else if(unwatchedList.findIndex((obj) => obj.name === str) >= 0 || watchedList.findIndex((obj) => obj.name === str) >= 0) {
      Alert.alert(`${str} already exists in your watchlist.`);
      return;
    }

    const showObject = {
      name : showName,
      watched : false,
      category : category,
      deviceId : Device.osBuildFingerprint
    };

    try{
     
      const docRef = await addDoc(collection(db, "watchlist"), showObject);
      const drid = docRef.id;
      // todo -> add docRef.id in showObject.
  
      console.log("Document written with ID", docRef.id);
    } catch(e) {
      console.error("Error adding document", e);
    }

    const arr = [...unwatchedList];
    arr.push(showObject);
    dispatch({type:'addShowToList', showObject : showObject});

    setUnwatchedList(arr);
    setShowName("");

    // route.params.getAllItems();
  }

  const showSearchResults = () => {
    
    const id1 = watchedList.findIndex((obj) => obj.name === searchedShow);
    const id2 = unwatchedList.findIndex((obj) => obj.name === searchedShow);
    if(id1 < 0 && id2 < 0) {
      Alert.alert("Show not found.");
      return;
    }
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>

       {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            onChangeText={setSearchedShow}
            value={searchedShow} 
            placeholder= "Search Show...🔍"
       
            onSubmitEditing={showSearchResults}
          />
      </View>
     
      <Text style={{marginTop : 30}}> Yet to watch ({unwatchedList.length})</Text>

      <View style={{flex : 3}}>
      <ScrollView>
      <ShowList
        type="Unwatched"
        category={category}
        list={unwatchedList}
        secondaryList = {watchedList}
        setList = {setUnwatchedList}
        setSecondaryList = {setWatchedList}
        isShowWatched={false}
  
      />

      <View>
      <Text style={styles.loginButtonBelowText1}>Watched ({watchedList.length})</Text>
      </View>
      
      <ShowList
        type="Watched"
        category={category}
        list={watchedList}
        secondaryList = {unwatchedList}
        setList = {setWatchedList}
        setSecondaryList = {setUnwatchedList}
        isShowWatched={true}
      />
      </ScrollView>

      </View>      
    
      <View style={{ flexDirection : "row", alignItems: "center", padding: 10}}>
   
          <TextInput
            style={styles.addShow}
            onChangeText={setShowName}
            value={showName}
            placeholder="Add Show..."
            onSubmitEditing={addShowToListInFirebase}
          />
  
      
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  list: {
    alignItems: "center",
    padding: 10,
  },
  listInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  Neu: {
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  loginButtonBelowText1: {
    // fontFamily: 'Consolas',
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: "center",
    color: "black",
  },
  addShow: {
    backgroundColor: "#D8E9A8",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderColor : "black",
    textAlign: 'center'
  },
  searchBar : {
    backgroundColor: "#D8E9A8",
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor : "black",
    textAlign: 'center'
  }
});
