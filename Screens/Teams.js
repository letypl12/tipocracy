import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function TeamsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Enter Tips</Text>
      <Button title="Tips" onPress={() => navigation.navigate("Tips")} />
    </View>
  );
}

export default TeamsScreen;
