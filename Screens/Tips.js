import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

function TipsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput>Enter your tip:</TextInput>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default TipsScreen;
