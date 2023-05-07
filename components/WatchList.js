import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, {useRef} from "react";
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
  const [docId, setDocId] = useState([]);
  const [offset,setOffset] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const itemList = route.params.allCategoryItems;
  
  const getItemNamesFoo = (list) => {
    let itemListNames = [];
    list.forEach((item) => {
      itemListNames.push(item.name);
    });
    return itemListNames;
  }

  useEffect(() => {

    console.log("Shows::::::", getItemNamesFoo(itemList));
     
    const unWatched = [...itemList.filter((obj) => obj.watched === false)];
    console.log("yet to watch::::::", getItemNamesFoo(unWatched));
    const watched = [...itemList.filter((obj) => obj.watched === true)];
    console.log("watched::::::", getItemNamesFoo(watched));
   
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
      Alert.alert(`${str} already exists in your list.`);
      return;
    }

    const showObject = {
      index : unwatchedList.length + 1,
      name : showName,
      watched : false,
      category : category,
      deviceId : Device.osBuildFingerprint
    };

    try{
     
      const docRef = await addDoc(collection(db, "watchlist"), showObject);
      const drid = docRef.id;
      const obj = {name : showName, id : drid};
      const arr = [...docId];
      arr.push(obj);
      setDocId(arr);
      console.log(`Document ${showObject.name} written with ID ${docRef.id}`);
    } catch(e) {
      console.error("Error adding document", e);
    }

    const arr = [...unwatchedList];
    arr.push(showObject);
    dispatch({type:'addShowToList', showObject : showObject});

    setUnwatchedList(arr);
    setShowName("");

  }

  const scrollViewRef = useRef();
 
  const scrollViewSizeChanged = (height) => {
  
    scrollViewRef.current?.scrollTo({y: scrollViewHeight, animated: true}); 
    setScrollViewHeight(height);
  } 

  const slowlyScrollDown = (numberOfItems, itemPosition) => {
    // if(itemPosition <= 2) return;
    const height = scrollViewHeight/1.5;
    const y = (height/numberOfItems)*itemPosition;
    console.log("scrollViewHeight, numberOfItems, itemPosition", height, numberOfItems, itemPosition, y);
    scrollViewRef.current?.scrollTo({x: 0, y, animated: true});
    // setOffset(y);
  }
  const searchShowFoo = (list) => {

    let idx = -1, res = -1;
    list.forEach((show) => {
      idx++;
      let str = show.name.toString().toLowerCase();
      let showStr = str.split(" ").join("");
      let typedStr = searchedShow.toString().toLowerCase().split(" ").join("");
      console.log(typedStr, showStr);
      if(typedStr === showStr) {
        res = idx;
      }
    })

    return res;
  }
  const showSearchResults = () => {
     
    const id1 = searchShowFoo(unwatchedList);
    const id2 = searchShowFoo(watchedList);
    console.log("showing search result with index: ", id1, id2);
    if(id1 < 0 && id2 < 0) {
      Alert.alert("Show not found.");
      return;
    }

    // scrollViewRef.current?.scrollTo({y: height, animated: true}); 
    const currentPosition = (id1 >= 0 ? id1 : (id2 >= 0 ? unwatchedList.length + id2 : -1)) + 1;
    const numberOfItems = (id1 >= 0 ? unwatchedList.length : (id2 >= 0 ?  unwatchedList.length + watchedList.length : 0));
    slowlyScrollDown(numberOfItems, currentPosition);

  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>

       {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            onChangeText={setSearchedShow}
            value={searchedShow} 
            placeholder= "Search Show 🔍"
            onSubmitEditing={showSearchResults}
          />
      </View>
     
      <Text style={{marginTop : 30, fontFamily:"monospace"}}> Yet to {category === 'Books' ? "Read" : "Watch"} ({unwatchedList.length})</Text> 

      <View style={{flex : 3}}>

      <ScrollView ref={scrollViewRef} onContentSizeChange={(width,height) => {scrollViewSizeChanged(height)}}>
        <ShowList
          type="Unwatched"
          category={category}
          list={unwatchedList}
          secondaryList = {watchedList}
          setList = {setUnwatchedList}
          setSecondaryList = {setWatchedList}
          isShowWatched={false}
          docId = {docId}
          navigation={navigation}
        />
     {/* </ScrollView> */}


      <View>
        {watchedList.length >= 0 && <Text style={styles.inBetweenText}> {category === 'Books' ? "Read" : "Watched"} ({watchedList.length})</Text> }
    
      </View>
{/*       
      <ScrollView> */}
      <ShowList
        type="Watched"
        category={category}
        list={watchedList}
        secondaryList = {unwatchedList}
        setList = {setWatchedList}
        setSecondaryList = {setUnwatchedList}
        isShowWatched={true}
        docId = {docId}
        navigation={navigation}
      />
      </ScrollView>

      {watchedList.length < 1 && unwatchedList.length < 1 && <Text> Empty {category === 'Books' ? "Readlist" : "Watchlist"}. 😓 Click below to add {category === 'Books' ? "📚" : "📺"}</Text>}

      </View>      
    
      <View style={{ flexDirection : "row", alignItems: "center", padding: 10}}>
   
          <TextInput
            style={styles.addShow}
            onChangeText={setShowName}
            value={showName}
            placeholder="Add Show ➕"
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
    backgroundColor : "#FFF"
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
  inBetweenText: {
    fontFamily: 'monospace',
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
