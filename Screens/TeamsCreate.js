import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';

function TeamsCreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Teams Create</Text>
      <TextInput>Name of Team:</TextInput>
      <Button
        title="Team A created"
        onPress={() => {
          navigation.navigate("Team A");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TeamsCreateScreen;
