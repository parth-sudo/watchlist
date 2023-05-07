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
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
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
    docId,
  } = props;

  const dispatch = useDispatch();
  const curItem = useSelector((state) =>
    state.find((obj) => obj.name === title));

  const updateWatchListInFirebase = async() => {
    
    console.log("Cur Item", curItem);
    const so = docId.find((obj) => obj.name === title);
    const curId = curItem.id ? curItem.id : so.id;
    // console.log(`Updating Document with name ${title} has id ${curId}`);
    const watchlistRef = doc(db, "watchlist", curId);
     
    await updateDoc(watchlistRef, {
      watched: true
    });

    dispatch({ type: "updateWatchedItems", title : title, deviceId : showObject.deviceId });

    const l = [...list];
    const sl = [...secondaryList];

    l.splice(idx, 1);
    sl.push(showObject);

    setList(l);
    setSecondaryList(sl);
  };

  const deleteWatchedShow = async () => {

    const so = docId.find((obj) => obj.name === title);
 
    const curId = curItem.id ? curItem.id : so.id;
    // console.log("CurItem", curItem);
    console.log(`Deleting Document with name ${title} has the id ${curId}`);
    await deleteDoc(doc(db, "watchlist", curId));
    dispatch({ type: "deleteShowFromWatchedList", id: curId });
    
    const arr = [...list];
    arr.splice(idx, 1);
    console.log("line 69 Item.js arr-", arr);
    setList(arr);

  };

  return (
    <View style={styles.container}>
      
      {!watched ? <TouchableOpacity  onPress={deleteWatchedShow}>
             <AntDesign name="delete" size={24} color="#E3E3E6" />
          </TouchableOpacity> :
          
            <TouchableOpacity onPress={deleteWatchedShow}>
            <AntDesign name="delete" size={24} color="#E3E3E6" />
          </TouchableOpacity>
      }

      <View style={{ flex : 1, alignItems: "center" }}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {!watched ? (
        <View style={{flexDirection : "row", alignItems:"center"}}>
          <TouchableOpacity onPress={updateWatchListInFirebase}>
            <Entypo name="circle" size={24} color="#E3E3E6" />
          </TouchableOpacity>
   
        </View>
      ) : (
        <Feather name="check-circle" size={24} color="#E3E3E6" />
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
    width: "89%",
    alignSelf: "center",
    backgroundColor: "#1A3883",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 2,
    fontSize: 20,
    color : "white",
    fontWeight: "400%",
    fontFamily: "sans-serif-light"
  },
});
