import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as React from 'react';
import MainTabNavigator from "./Navigation/MainTabNavigator";
import AuthNavigator from "./Navigation/AuthNavigator";

function App() {
  let renderedOutput = [];

  if (!global.authenticated == true) {
    renderedOutput.push(<AuthNavigator />);
  } else {
    renderedOutput.push(<MainTabNavigator />);
  }

  return renderedOutput;
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
