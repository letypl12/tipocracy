import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as React from 'react';
import MainTabNavigator from "./Navigation/MainTabNavigator";
import AuthNavigator from "./Navigation/AuthNavigator";
import * as SecureStore from "expo-secure-store";

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("authenticated");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setAuthenticated(userToken)
    };

    bootstrapAsync();
  }, []);



  return (

      {authenticated == null ? (
        <AuthNavigator />
      ) : (
        <MainTabNavigator />
      )}

  );
}

export default App;

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  }
});
