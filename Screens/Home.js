import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../utils/authContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "../utils/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { reducer, initialState } from "../utils/reducer";

function HomeScreen({ navigation }) {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { signOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place

  //   const bootstrapAsync = async () => {
  //     let userToken;
  //     try {
  //       userToken = await SecureStore.getItemAsync('userToken');
  //       console.log('userToken from SecureStore:' + userToken);
  //     } catch (e) {
  //       // Restoring token failed
  //       console.log('restoring token failed');
  //     }

  //     // After restoring token, we may need to validate it in production apps
  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     setUserToken(JSON.parse(userToken));
  //     console.log('setting isLoading to false');
  //     setIsLoading(false);
  //   };
  //   bootstrapAsync();
  // }, []);

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

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.containerTopRow}>
          <View style={styles.containerTop}>
            <TouchableOpacity title="Logout" onPress={() => logout()}>
              <Ionicons name="log-out" style={styles.containerTopFont} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBody}>
          <View style={styles.containerRow}>
            <Text style={styles.setFontSizeOne}>
              Hello {global.userToken.name} ,
            </Text>
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
}

export default HomeScreen;
