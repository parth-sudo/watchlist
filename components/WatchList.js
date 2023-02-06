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
import {app, db, getFirestore, collection, addDoc, getDocs} from "../firebase/index.js";

export default function WatchList({ navigation, route }) {
  const [category, setCategory] = useState(route.params.category);
  const [check, setCheck] = useState(false);
  const [showName, setShowName] = useState("");
  const [searchedShow, setSearchedShow] = useState("");
  const [unwatchedList, setUnwatchedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
 
  // const [checkedShows, setCheckedShows] = useState([]);

  const itemList = useSelector(
    (state) => state.filter((obj) => obj.category === category)
  );

  useEffect(() => {
    // console.log(itemList);
    // console.log(category);
    const unWatched = [...itemList.filter((obj) => obj.watched === false)];
    const watched = [...itemList.filter((obj) => obj.watched === true)];
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
      category : category
    };

    try{
      const docRef = await addDoc(collection(db, "watchlist"), showObject);
      console.log("Document written with ID", docRef.id);
    } catch(e) {
      console.error("Error adding document", e);
    }

    const arr = [...unwatchedList];
    arr.push(showObject);
   
    setUnwatchedList(arr);
    setShowName("");
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
      <View style={{alignItems: "center", padding: 10}}>
        {/* <View style={{ flex: 1, width: "60%", marginLeft: 5 }}> */}
          <TextInput
            style={styles.input}
            onChangeText={setShowName}
            value={showName}
            placeholder="Add Show..."
            onSubmitEditing={addShowToListInFirebase}
          />
        {/* </View> */}

       {/* Search Bar */}
        {/* <View style={{ flex: 1, width: "60%", marginLeft: 5 }}> */}
          <TextInput
            style={styles.input}
            onChangeText={setSearchedShow}
            value={searchedShow} 
            placeholder= "Search Show..."
            onSubmitEditing={showSearchResults}
          />
        {/* </View> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 35,
    width : "90%",
    marginTop: 12,
    padding: 10,
    borderRadius: 20,
    backgroundColor : "lightpink"
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
  hairline: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: 330,
  },
  loginButtonBelowText1: {
    // fontFamily: 'Consolas',
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: "center",
    color: "grey",
  },
});
