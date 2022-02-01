import React, { useEffect, useState, useContext, useReducer } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { AuthContext } from "../utils/authContext";
import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "../utils/styles";
import Ionicons from "react-native-vector-icons/Ionicons";


function HomeScreen({ navigation }) {
  const { signOut } = useContext(AuthContext);

  const logout = () => {
    console.log("in logout");
    signOut();
  };

  let user = firebase.auth().currentUser.displayName;

  return (
    <View style={styles.container}>
      <View style={styles.containerTopRow}>
        <View style={styles.containerTop}>
          <TouchableOpacity title="Logout" onPress={() => logout()} >
            <Ionicons name="log-out" style={styles.containerTopFont}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBody}>
        <View style={styles.containerRow}>
            <Text style={styles.setFontSizeOne}>Hello {user}!:</Text>
        </View>
        
        <View style={styles.containerRow}>
          <Button
            title="Want to join a Team?"
            onPress={() => navigation.navigate("Teams")}
          />
        </View>

      </View>


      
    </View>
  );
}



export default HomeScreen;
