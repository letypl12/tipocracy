import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
// import { navigation } from '@react-navigation/native';

function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput>Login</TextInput>
      <Button
        title="Authenticate"
        onPress={() => global.authenticated = true}
      />
    </View>
  );
}

export default LoginScreen;
