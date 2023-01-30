import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import Home from "./components/Home.js";
import WatchList from "./components/WatchList.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="WatchList" component={WatchList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home" }}
            />
            <Stack.Screen name="WatchList" component={WatchList} />
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
