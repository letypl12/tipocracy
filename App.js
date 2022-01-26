import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
      <Text>Open up App.js to start working on your app Lety and Eunice!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
