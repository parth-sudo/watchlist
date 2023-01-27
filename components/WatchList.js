import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
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
  const [unwatchedList, setUnwatchedList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const itemList = useSelector(
    (state) => state.find((obj) => obj.category === category).items
   );

  useEffect(() => {
    console.log(itemList);
    console.log(category);
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
      let showObject = {
        name : showName,
        watched : false,
      }
      arr.unshift(showObject);
      dispatch({type : 'addShowToCategory', 'updatedCategory' : category, 'updatedItems' : arr})
      setUnwatchedList(arr);
      setShowName("");
    }

  return (
 
    <View style={styles.container}>
    
     <View style={{margin : 10}}>
      <CheckBox
        center
        title={`Add a show`}
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={check}
        onPress={() => {
            textInputRef.current.focus(); 
            setCheck(!check);
          }}
      />
      </View>
        
    <View style={{flexDirection : 'row', alignItems : 'center', padding : 10}}>
        <View style={{ flex : 2.1, width : "60%", marginLeft : 5}}>
            <TextInput
                style={styles.input}
                onChangeText={setShowName}
                value={showName}
                ref={textInputRef}
                placeholder = "Add Show..."
                onSubmitEditing = {addShowToList}
            />
      </View>
      <View style={{flex : 1}}>
     <Button onPress={addShowToList} size="sm" title="+" type="clear" />
     </View>
     </View>

            <ShowList type="Unwatched" category={category} list={unwatchedList}/>

            <View style={styles.hairline} />
            <Text style={styles.loginButtonBelowText1}>Watched</Text>
            <View style={styles.hairline} />

            <ShowList type="Watched" category={category} list={watchedList}/>
   
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
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 2,
    width: 165
  },
  loginButtonBelowText1: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: '#A2A2A2'
  },
});
