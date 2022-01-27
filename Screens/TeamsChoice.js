import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

// // function GoToButton({ TeamsChoiceScreen }) {
// const navigation = useNavigation();

function TeamsChoiceScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Teams Choice</Text>
      <Button
        title="Team A"
        onPress={() => {
          navigation.navigate("Team A");
        }}
      />
      <Button
        title="Team B"
        onPress={() => {
          navigation.navigate("Team B");
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

export default TeamsChoiceScreen;
