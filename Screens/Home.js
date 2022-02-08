import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  ActivityIndicator,
  Image,
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

function HomeScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const {team_uid} = route.params;

  

  const renderHomeMessage = () =>{
    console.log('in renderHomeMewssage, with team_uid: ' + team_uid);
    let tmpArr = [];


    if (team_uid == ''){
      tmpArr.push(
            <View style={styles.containerRow}>
              <Button
              title="Choose A Team To Get Started"
              onPress={() => navigation.navigate("Teams")}
              key={"chooseTeam"}
              />
            
            </View>)
    }else{
      tmpArr.push(<View style={styles.containerRow}>

            <Text>Your team is {team_uid} </Text>
            </View>)      
    }

    return tmpArr
  }

  if (!isLoading) {
    return (
      <View style={styles.home_container}>
        <View style={styles.home_containerTopRow}>
          <View style={styles.home_containerTop}>
            <View style={{flex:.8, flexDirection:'column'}}>
              <View style={{flex:1, flexDirection:'row'}}>
                <Image key={"logo"} resizeMethod='resize' resizeMode='contain'  source={require('../images/tipocracy_logo.png')} style={{flex:1, height:'95%'}}/>
              </View>
              
            </View>
            <View style={{flex:.2, flexDirection:'column'}}>
              <TouchableOpacity title="Settings" onPress={() => {navigation.navigate("Settings")}}>
                <View style={{alignItems:'center'}}>
                  <Ionicons name="settings" style={styles.home_textTitle} />  
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={styles.home_textSubTitle}>Settings</Text>
                </View>            
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View style={styles.home_containerBody}>
          <View style={styles.containerRow}>
            <Text style={styles.textH1}>
              Hello {global.userToken.name} ,
            </Text>
          </View>

          {renderHomeMessage()}
        </View>
      </View>
    );
  }
}

export default HomeScreen;
