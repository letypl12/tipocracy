import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";

import { validateAll } from "indicative/validator";
import { AuthContext } from "../utils/authContext";
import { useEffect, useState, useContext } from "react";
import styles from "../utils/styles";
import {ListItem, Button, Input} from "react-native-elements"
import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";
import { BigHead } from 'react-native-bigheads'
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import * as Icons from "react-native-vector-icons";
import firebase from "@react-native-firebase/app";

function ProfileScreen({ route, navigation }) {

  const { reload } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setemailAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [PasswordErrors, setPasswordErrors] = useState({});

  useEffect(() => {}, [PasswordErrors]);

  const validatePassword = async () => {
    setPasswordErrors({});
    
    // https://indicative.adonisjs.com
    const rules = {
    currentPassword: "required|string",
    password: "required|string|min:6|max:40|confirmed",
    };

    const data = {
    currentPassword: currentPassword,
    password: password,
    password_confirmation: passwordConfirm,
    };

    const messages = {
    required: (field) => `${field} is required`,
    "password.min":
        "Password is too short. Must be greater than 6 characters",
    "password.confirmed": "Passwords do not match",
    };

    validateAll(data, rules, messages)
    .then(async () => {
        //console.log("form validated, sending: " + JSON.stringify(data));
        await changePassword(data);
    })

    .catch((err) => {
        console.log("caught:" + JSON.stringify(err));
        const formatError = {};
        for (let myErr of err) {
        formatError[myErr.field] = myErr.message;
        }
        setPasswordErrors(formatError);
    });
};

const changePassword = () => {
    setIsLoading(true);
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(password).then(() => {
        alert("Password updated!");
        setCurrentPassword('');
        setPassword('');
        setPasswordConfirm('');
        setIsLoading(false);
      }).catch((error) => { setIsLoading(false); alert(error); console.log(error); });
    }).catch((error) => { setIsLoading(false); alert(error); console.log(error); });
  }



 const reauthenticate = () => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }


  
  const changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        console.log("Email updated!");
      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }  

  if (isLoading) {
    return <ActivityIndicator />;
  }

    return (

      <ScrollView style={styles.container}>


        <Text style={styles.textH1}>Change Password</Text>

        <Input
            label={"Current Password"}
            placeholder="Current Password.."
            value={currentPassword}
            onChangeText={setCurrentPassword}
            errorStyle={{ color: "red" }}
            errorMessage={PasswordErrors ? PasswordErrors.currentPassword : null}
            secureTextEntry
            leftIcon={
                <Icons.Ionicons
                  name='lock-closed-outline'
                  size={24}
                  color='black'
                />
              }
            />

        <Input 
            label={"New Password"}
            placeholder="New Password.."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={
                <Icons.Ionicons
                  name='lock-closed-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Input
            label={"New Password Confirm"}
            placeholder="New password again"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            leftIcon={
                <Icons.Ionicons
                  name='lock-closed-outline'
                  size={24}
                  color='black'
                />
              }
            />

            <Text style={{ color: "red", marginLeft: 10, fontSize: 10 }}>
            {PasswordErrors ? PasswordErrors.password : null}
            </Text>



        <Button
          buttonStyle={[styles.buttonBase, {marginTop:10}]}
          titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
          title="Change Password"
          onPress={validatePassword}
        />
      </ScrollView>
    );

}



export default ProfileScreen;
