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
import moment from "moment";

function HomeScreen({ route, navigation }) {
  const { reload, teamTokenFromRoute } = route.params;
  const [teamToken, setTeamToken] = useState({teamName:'', team_uid:'', teamDescription:''});
  const [isLoading, setIsLoading] = useState(true);
  const [myTipsTotal, setMyTipsTotal] = useState(0);
  const [teamTipsTotal, setTeamTipsTotal] = useState(0);
  const [reloadDate, setReloadDate] = useState(reload)
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      setReloadDate(Date.now())
    });
    return unsubscribe;
  }, [navigation]);  
  
  useEffect(() => {
    const getData = async () =>{
      if (teamTokenFromRoute) {
        console.log('TOKEN FROM ROUTE ' + teamTokenFromRoute.team_uid)
        setTeamToken(teamTokenFromRoute)
      }else{
        if (global.teamToken !== null){
          //we have the teamToken already saved somewhere      
          //console.log('in getData, our global team_uid is:' + global.teamToken.team_uid);
          console.log('TOKEN FROM GLOBAL ' + global.teamToken.team_uid)
          setTeamToken(global.teamToken);
          
        }else{
          //call firestore with the global.userToken.defaultTeam to find and build a new global.teamToken
          //if the global.userToken.defaultTeam !== ''
          console.log('TOKEN FROM STATE ' + teamToken.team_uid)
        }
      }
      await getTipsTotal("team_uid", teamToken.team_uid);
      await getTipsTotal("uid", global.userToken.uid);
      setIsLoading(false);
    };
    getData();
    
  }, [reloadDate])

  


  
  const getTipsTotal = async (queryparam, queryvalue) => {
    // firebase
    if (queryvalue == ''){
      return false
    }
      let myTips = [];
      let date24 = moment().subtract(24, "hours").toDate();
      console.log(date24);
      console.log(firestore.Timestamp.fromDate(date24));
      firestore()
      .collection("Tips")
      .where(queryparam, "==", queryvalue)
      //.where("createdDateTime", ">=", firestore.Timestamp.fromDate(date24))
      .get()
      .then((querySnapshot) => {
        //console.log("Firestore Total tips records: " + querySnapshot.size + " for " + queryparam + " : " + queryvalue);
       
        querySnapshot.forEach((documentSnapshot) => {
          let tmpTip = {
                          amount: documentSnapshot.get('amount'),
                          createdDateTime: documentSnapshot.get("createdDateTime"),
                          team_uid: documentSnapshot.get("team_uid"),
                          uid: documentSnapshot.get("uid")
                        }
          myTips.push(tmpTip)                        
         
        });
        for (i=0; i<myTips.length; i++){
          // myTips[i].amount = parseFloat(myTips[i].amount);
          myTips[i].amount = parseFloat(myTips[i].amount);

        }
        //console.log('Length of new tips object:' + myTips.length);   
        //console.log('TIPS: ' + JSON.stringify(myTips));

        // teamTipsTotal=myTips.reduce((total, currentValue) => total = total + (currentValue.amount),0);
      
        result = myTips.reduce((total, currentValue) => total = total + (currentValue.amount),0);
        console.log('in getTipsTotal, with query for: ' + queryparam + ': ' + queryvalue + ', the total is: ' + result);
        if (queryparam == 'uid'){
          setMyTipsTotal(parseFloat(result).toFixed(2))
        }else{
          setTeamTipsTotal(parseFloat(result).toFixed(2));
        }
      }); 

        

  }

  const renderHomeMessage = () =>{
    console.log('in renderHomeMessage, with team_uid: ' + teamToken.team_uid);
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
              <Text style={[styles.textBase, {color:'white'}]}>You have made $ {myTipsTotal} in the past 24 hours in all of your teams.</Text>
              </View>
              <View style={styles.containerRow}>
              <Text style={[styles.textBase, {color:'white'}]}>{teamToken.teamName} has made $ {teamTipsTotal} in the past 24 hours as a team.</Text>
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
      <View style={[styles.home_container,{backgroundColor:'black'}]}>

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
