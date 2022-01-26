import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamsScreen from "./Teams";
import TipsScreen from "./Tips";

const HomeStack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Teams" component={TeamsScreen} />
      <HomeStack.Screen name="Tips" component={TipsScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
