import React, { useEffect, useState, useContext, useReducer } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { AuthContext } from '../utils/authContext';



function HomeScreen({ navigation }) {
  
  const {signOut} = useContext(AuthContext);

  const logout = () => {
    console.log("in logout");
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.setFontSizeOne}>Hello User!:</Text>

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
