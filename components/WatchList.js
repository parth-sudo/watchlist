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
import { CheckBox, Icon, Button } from "@rneui/themed";
import ShowList from "./ShowList";

export default function WatchList({ navigation, route }) {
  const [category, setCategory] = useState(route.params.category);
  const [check, setCheck] = useState(false);
  const [showName, setShowName] = useState("");
  const [searchedShow, setSearchedShow] = useState("");
  const [unwatchedList, setUnwatchedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
 
  // const [checkedShows, setCheckedShows] = useState([]);

  const itemList = useSelector(
    (state) => state.find((obj) => obj.category === category).items
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

  const addShowToList = () => {
    console.log("Adding show to list");
    const arr = [...unwatchedList];
    const str = showName;
    if(!str) {
      Alert.alert("Your show name cannot be empty.");
      return;
    }
    else if(arr.findIndex((obj) => obj.name === str) >= 0) {
      Alert.alert(`${str} already exists in your watchlist.`);
      return;
    }
     
    let showObject = {
      name: showName,
      watched: false,
    };

    arr.push(showObject);
    dispatch({
      type: "addShowToCategory",
      updatedCategory: category,
      updatedItems: arr,
    });
    setUnwatchedList(arr);
    setShowName("");
  };

  return (
    <View style={styles.container}>
     
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <View style={{ flex: 1, width: "60%", marginLeft: 5 }}>
          <TextInput
            style={styles.input}
            onChangeText={setShowName}
            value={showName}
        
            placeholder="Add Show..."
            onSubmitEditing={addShowToList}
          />
        </View>

        <View style={{ flex: 1, width: "60%", marginLeft: 5 }}>
          <TextInput
            style={styles.input}
            onChangeText={setSearchedShow}
            value={searchedShow} 
      
            placeholder="Search Show..."
            onSubmitEditing={addShowToList}
          />
        </View>
      
      </View>

      
      <ShowList
        type="Unwatched"
        category={category}
        list={unwatchedList}
        secondaryList = {watchedList}
        setList = {setUnwatchedList}
        setSecondaryList = {setWatchedList}
        isShowWatched={false}
      />

      <View style={styles.hairline} />
      <Text style={styles.loginButtonBelowText1}>Watched</Text>
      <View style={styles.hairline} />

      <ShowList
        type="Watched"
        category={category}
        list={watchedList}
        secondaryList = {unwatchedList}
        setList = {setWatchedList}
        setSecondaryList = {setUnwatchedList}
        isShowWatched={true}
      />
    </View>
  );
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
    borderRadius: 20,
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
    color: "#A2A2A2",
  },
});
