import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput>Your Tips:</TextInput>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("My Tipocracy")}
      />
    </View>
  );
}

export default HistoryScreen;
