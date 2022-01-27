import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as React from 'react';
import MainTabNavigator from "./Navigation/MainTabNavigator";

function App() {
  return (
    <MainTabNavigator/>
  );
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
