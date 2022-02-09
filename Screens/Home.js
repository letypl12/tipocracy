import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../utils/authContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import styles from "../utils/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { reducer, initialState } from "../utils/reducer";
import Video from "react-native-video";
import Svg from "react-native-svg";

function HomeScreen({ route, navigation }) {
  const [teamToken, setTeamToken] = useState({teamName:'', team_uid:'', teamDescription:''});



  const [isLoading, setIsLoading] = useState(true);
  const [myTipsTotal, setMyTipsTotal] = useState(0);
  const [teamTipsTotal, setTeamTipsTotal] = useState(0);

  
  
  

  const getData = () =>{
    if (global.teamToken !== null){
      //we have the teamToken already saved somewhere      
      console.log('in getData, our global team_uid is:' + global.teamToken.team_uid);
      setTeamToken(global.teamToken);
      
    }else{
      //call firestore with the global.userToken.defaultTeam to find and build a new global.teamToken
      //if the global.userToken.defaultTeam !== ''
      console.log('in getData, our team_uid is:' + teamToken.team_uid);
      
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      getData()
    });
    return unsubscribe;
  }, [navigation]);   

  const renderHomeMessage = () =>{
    console.log('in renderHomeMewssage, with team_uid: ' + teamToken.team_uid);
    let tmpArr = [];


    if (teamToken.team_uid == ''){
      tmpArr.push(
            <View style={styles.containerRow} style={{alignItems:'center', justifyContent:'center', width:'100%'}}>
              <Button
              title="Choose A Team To Get Started"
              onPress={() => navigation.navigate("TeamsTab")}
              key={"chooseTeam"}
              buttonStyle={[styles.buttonBase, {marginTop:20}]}
              titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}


              />
            
            </View>)
    }else{
      tmpArr.push(
            <View>
              <View style={styles.containerRow}>
                <Text style={[styles.textBase, {color:'white'}]}>Your current team is: {teamToken.teamName} </Text>
              </View>
              <View style={styles.containerRow}>
              <Text style={[styles.textBase, {color:'white'}]}>You have made ${myTipsTotal} in the past 24 hours.</Text>
              </View>
              <View style={styles.containerRow}>
              <Text style={[styles.textBase, {color:'white'}]}>Your team has made ${teamTipsTotal} in the past 24 hours.</Text>
              </View>
            </View>
            )      
    }

    return tmpArr
  }

  if (isLoading){
    return(
      <ActivityIndicator />
    )
  }
  if (!isLoading) {
    return (
      <View style={[styles.home_container, {backgroundColor:'black'}]}>

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
        {/* <Video
        source={require("../images/tipVideo1.mov")}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
        automaticallyWaitsToMinimizeStalling={true}
        />           */}
          <View style={styles.containerRow}>
            <Text style={[styles.textH1home, {color:'white'}]}>
              Hello {global.userToken.name}
            </Text> 

          </View>

          {renderHomeMessage()}
        </View>
      </View>
    );
  }
}

export default HomeScreen;
