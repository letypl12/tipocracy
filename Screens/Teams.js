import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';


function TeamsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Teams</Text>
      <Button
        title="Choose A Team"
        onPress={() => {
          navigation.navigate("Choose A Team");
        }}
      />
      <Button
        title="Edit A Team"
        onPress={() => {
          navigation.navigate("Edit A Team");
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

export default TeamsScreen;
