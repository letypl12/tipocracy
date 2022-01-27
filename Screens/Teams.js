import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import TipsScreen from "./Tips";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Teams({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>Select a Team:</Text>
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
function TeamA({ navigation }) {
  return (
    <View>
      <Text>Team A</Text>
      <Button
        title="Submit your Tips"
        onPress={() => {
          navigation.navigate("Tips");
        }}
      />
    </View>
  );
}

function TeamB({ navigation }) {
  return (
    <View>
      <Text>Team B</Text>
      <Button
        title="Submit your Tips"
        onPress={() => {
          navigation.navigate("Tips");
        }}
      />
    </View>
  );
}
function TeamC() {
  return <View />;
}
const StackTeams = createNativeStackNavigator();
function TeamsScreen({ navigation }) {
  return (
    <StackTeams.Navigator initialRouteName="Teams">
      <StackTeams.Group>
        <StackTeams.Screen name="Teams" component={Teams} />
      </StackTeams.Group>

      <StackTeams.Screen name="Team A" component={TeamA} />
      <StackTeams.Screen name="Team B" component={TeamB} />
    </StackTeams.Navigator>
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
