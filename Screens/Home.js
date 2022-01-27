import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamsScreen from "./Teams";
import TipsScreen from "./Tips";

function HomeGreeting({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.setFontSizeOne}>Hello User!:</Text>

      <Button
        title="Want to join a Team?"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen name="My Tipocracy" component={HomeGreeting} />
      </HomeStack.Group>
      {/* <HomeStack.Screen name="Greeting" component={HomeGreeting} /> */}
      <HomeStack.Screen
        name="Home"
        component={TeamsScreen}
        options={{ title: "My Teams!" }}
      />
      <HomeStack.Screen name="Tips" component={TipsScreen} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aquamarine",
    alignItems: "center",
    justifyContent: "center",
  },
  setFontSizeOne: {
    fontSize: 25,
  },
});

export default HomeScreen;
