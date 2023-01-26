import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NeuView } from "neumorphism-ui";
import { CheckBox, Icon } from "@rneui/themed";

export default function WatchList({ navigation, route }) {
  const [category, setCategory] = useState(route.params.category);
  const [check, setCheck] = useState(false);
  const [showName, setShowName] = useState("Enter show...");

  const itemList = useSelector(
    (state) => state.find((obj) => obj.category === category).items
  );

  useEffect(() => {
    console.log(itemList);
  }, []);

  return (
    <View style={styles.container}>
      <Text> WatchList </Text>
      <CheckBox
        center
        title={`Click Here to ${check ? "Remove" : "Add"} This Item`}
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={check}
        onPress={() => setCheck(!check)}
      />
      <TextInput
        style={styles.input}
        onChangeText={setShowName}
        value={showName}
      />
      <View style={styles.list}>
        {itemList.length > 0 ? (
          itemList.map((item, idx) => {
            return (
              <View style={{flexDirection:'row'}} key={idx}>
                <TouchableOpacity style={{flex:2}}>
                  <NeuView style={styles.Neu}>
                    <Text style={{ opacity: 0.9, color: "white" }}>
                      {item.name}
                    </Text>
                  </NeuView>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <CheckBox
                    center
                    title="Wacthed"
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
  },
  list: {
    alignItems: "center",
  },
  Neu: {
    width: 300,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
