import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';

const login = () =>{
    global.authenticated = true
}

function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput>Login</TextInput>
      <Button
        title="Authenticate"
        onPress={() => login()}
      />
    </View>
  );
}

export default LoginScreen;
