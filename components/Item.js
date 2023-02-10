import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { NeuButton, NeuView } from "neumorphism-ui";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { db, updateDoc, doc, deleteDoc } from "../firebase/index.js";

export default function Item(props) {
  const {
    category,
    watched,
    title,
    showObject,
    idx,
    list,
    secondaryList,
    setList,
    setSecondaryList,

  } = props;

  const dispatch = useDispatch();
  // const curItem = useSelector((state) => state[idx]);

  const updateWatchListInFirebase = async () => {

    const watchlistRef = doc(db, "watchlist", showObject.id);
    
    await updateDoc(watchlistRef, {
      watched: true,
    });

    dispatch({ type: "updateWatchedItems", deviceId : showObject.deviceId });

    const l = [...list];
    const sl = [...secondaryList];
    //todo.
    // temp[idx] = !temp[idx];

    l.splice(idx, 1);
    sl.push(showObject);

    setList(l);
    setSecondaryList(sl);
  };

  const deleteWatchedShow = async () => {

    await deleteDoc(doc(db, "watchlist", showObject.id));
    dispatch({ type: "deleteShowFromWatchedList", id: showObject.id });
    
    const arr = [...list];
    arr.splice(idx, 1);
    setList(arr);

  };

  return (
    <View style={styles.container}>
      
      {!watched && <TouchableOpacity  onPress={deleteWatchedShow}>
            <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>}

      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {!watched ? (
        <View style={{flexDirection : "row", alignItems:"center"}}>
          <TouchableOpacity onPress={updateWatchListInFirebase}>
            <AntDesign name="checkcircleo" size={24} color="black" />
          </TouchableOpacity>

        </View>
      ) : (
        <TouchableOpacity onPress={deleteWatchedShow}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 2,
    fontSize: 20,
    fontWeight: "300%",
  },
});
