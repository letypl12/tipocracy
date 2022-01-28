import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

function TipsScreen({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={styles.container}>
      <Text>You are on Team:</Text>
      <Text>Enter Tip:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        keyboardType="numeric"
      ></TextInput>
      <Button title="Enter"></Button>
      <Button title="Go to Team" onPress={() => navigation.goBack()} />
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
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 100,
  },
});

export default TipsScreen;
