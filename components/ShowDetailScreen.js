import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

function ShowDetailScreen({ navigation, route }) {
  const show = route.params.show;

  return (
    <View style={styles.container}>
        <View style={styles.innerView}>
            <Card>
                <Card.Title> {show.name} </Card.Title>
                <Card.Divider />
                <Card.Image source={{}} />
                <Text style={{ alignItems: "center", marginBottom: 10 }}>
                 sample
                </Text>
                <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
                title="VIEW NOW"
                />
            </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  innerView: {
    marginTop : 10,
    width : "80%"
  }
});

export default ShowDetailScreen;
