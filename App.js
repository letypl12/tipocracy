import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./Screens/Home";
import TeamsScreen from "./Screens/Teams";
import HistoryScreen from "./Screens/History";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// export default function App() {
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "My Home" }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{ tabBarLabel: "History" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
// const Stack = createNativeStackNavigator();
// <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Teams" component={TeamsScreen} />
//       </Stack.Navigator>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
