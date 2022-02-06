import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";

import { AuthContext } from "../utils/authContext";
import { useEffect, useState, useContext } from "react";
import styles from "../utils/styles";
import {ListItem, Button} from "react-native-elements"
import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";



function SettingsScreen({ route, navigation }) {
  const { signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  let myInvites = []
  let myTeams = []

  const logout = async () => {
    console.log("in logout");
    //first signout of firebase auth
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
    
      await SecureStore.deleteItemAsync('userToken')
    //now clear out values stored in our AuthContext
    signOut();
  };

  

 

  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <View style={styles.container}>

  
        <Text style={styles.textH1}>Sign Out</Text>
        <Text style={styles.textBase}>Click the button below to sign out completely from TIPocracy.</Text>  
        <Button
          style={styles.buttonBase}
          title="Sign Out"
          onPress={logout}
        />
      </View>
    );

}



export default SettingsScreen;
