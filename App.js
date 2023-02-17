import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import Home from "./components/Home.js";
import ShowDetailScreen from "./components/ShowDetailScreen.js";
import WatchList from "./components/WatchList.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Handlee_400Regular, Handlee_500Medium } from "@expo-google-fonts/handlee";

// import useFonts from './hooks/useFonts';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home", headerShown:false }}
            />
            <Stack.Screen name="WatchList" component={WatchList} />
            <Stack.Screen name="ShowDetail" component={ShowDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
