import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { useEffect, useContext, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabNavigator from "./Navigation/MainTabNavigator";
import * as SecureStore from "expo-secure-store";

import { stateConditionString } from "./utils/helpers";
import { AuthContext } from "./utils/authContext";
import { reducer, initialState } from "./utils/reducer";

import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";
import SplashScreen from "./Screens/Splash";

const Stack = createStackNavigator();

export default App = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          console.log(
            "dispatcing with token: " + JSON.stringify(data.userToken)
          );
          global.userToken = data.userToken;
          dispatch({ type: "SIGN_IN", token: data.userToken });
        } else {
          dispatch({ type: "TO_SIGNIN_PAGE" });
        }
      },
      signOut: async (data) => {
        global.userToken = {};
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          global.userToken = data.userToken;
          dispatch({ type: "SIGNED_UP", token: data.userToken });
        } else {
          dispatch({ type: "TO_SIGNUP_PAGE" });
        }
      },
    }),
    []
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case "LOAD_APP":
        arr.push(<Stack.Screen name="Splash" component={SplashScreen} />);
        break;

      case "LOAD_SIGNUP":
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "Sign Up",
              animationTypeForReplace: state.isSignout ? "pop" : "push",
            }}
          />
        );
        break;
      case "LOAD_SIGNIN":
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;

      default:
        arr.push(<Stack.Screen name="SignIn" component={SignInScreen} />);
        break;
    }
    return arr[0];
  };
  console.log("The state is:" + stateConditionString(state));
  console.log("The state userToken is:" + JSON.stringify(state.userToken));

  if (stateConditionString(state) == "LOAD_HOME") {
    return (
      <AuthContext.Provider value={authContextValue}>
        <MainTabNavigator />
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider value={authContextValue}>
        <NavigationContainer>
          <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};
