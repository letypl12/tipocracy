import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import AuthNavigator from "../Navigation/AuthNavigator";
import * as SecureStore from "expo-secure-store";
// import { navigation } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';


const login = async () => {
  console.log('in login');

  await SecureStore.setItemAsync("authenticated", true);
  global.authenticated = true;
  this.setState('authenticated', true)
};
function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'font-awesome', name: 'user' }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} 
        leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}
      />
      
      <Button
        title="Signin"
        onPress={() => login()}
      />
    </View>
  );
}

export default LoginScreen;
