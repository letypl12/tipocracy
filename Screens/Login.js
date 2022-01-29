import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import AuthNavigator from "../Navigation/AuthNavigator";
import * as SecureStore from "expo-secure-store";
// import { navigation } from '@react-navigation/native';

const login = () => {
  await SecureStore.setItemAsync("authenticated", true);
};
function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { logIn } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      >
        Login
      </TextInput>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      ></TextInput>
      <Button
        title="Authenticate"
        onPress={() => logIn({ username, password })}
      />
    </View>
  );
}

export default LoginScreen;
