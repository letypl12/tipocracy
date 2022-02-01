import React, { useEffect, useState, useContext, useReducer } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from "../utils/authContext";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

function HomeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  const logout = () => {
    console.log("in logout");
    signOut();
  };

  let user = firebase.auth().currentUser.displayName;

  return (
    <View style={styles.container}>
      <Text style={styles.setFontSizeOne}>Hello {user}!:</Text>

      <Button
        title="Want to join a Team?"
        onPress={() => navigation.navigate("Teams")}
      />

      <Button title="Logout" onPress={() => logout()} />
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
  setFontSizeOne: {
    fontSize: 25,
  },
});

export default HomeScreen;
