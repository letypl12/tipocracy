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
        global.userToken = null;
        global.teamToken = null;
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('teamToken')
    //now clear out values stored in our AuthContext
    signOut();
  };

  const editProfile = () =>{
    navigation.navigate("Profile")
  }

 

  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <View style={styles.container}>


        <Text style={styles.textH1}>Personal Profile</Text>
        <Text style={styles.textBase}>Create your avatar, choose your pronouns, and more.</Text>  
        <Button
          buttonStyle={styles.buttonBase}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}

          title="Edit Profile"
          onPress={editProfile}
        />       


        <Text style={styles.textH1}>Login Info</Text>
        <Text style={styles.textBase}>Change your password.</Text>  
        <Button
          buttonStyle={styles.buttonBase}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}

          title="Edit Login"
          onPress={()=>{navigation.navigate("Login Info")}}
        />      

        <Text style={[styles.textH1, {marginTop:20}]}>Sign Out</Text>
        <Text style={styles.textBase}>Click the button below to sign out completely from TIPocracy.</Text>  
        <Button
          buttonStyle={styles.buttonBase}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}

          title="Sign Out"
          onPress={logout}
        />
      </View>
    );

}



export default SettingsScreen;
