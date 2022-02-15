import {useEffect, useState} from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

// import { navigation } from '@react-navigation/native';
import { Button, CheckBox, Icon, Card, Input } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import { ScrollView } from "react-native-gesture-handler";
import styles from "../utils/styles";
import firestore from "@react-native-firebase/firestore";
// import * as Localization from 'expo-localization';


function HistoryScreen({ navigation }) {
  const [allTips, setAllTips]=useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  // const [timeZone, setTimeZone] = useState(Localization.timezone())
//Refresh the screen on navigation listener thing

//function to pull the records between the dates
const getTipsRangeDate = async (queryparam, queryvalue) => {
  //First get the teams and set them to a state variable for easy lookup later
  let myTips = [];
  


        console.log(startDate);
        console.log(firestore.Timestamp.fromDate(startDate));
        firestore()
        .collection("Tips")
        .where(queryparam, "==", queryvalue)
        .where('createdDateTime', ">=", startDate)
        .where("createdDateTime", "<=", endDate)
        .get()
        .then((querySnapshot) => {
          console.log("Firestore Total tips records: " + querySnapshot.size + " for " + queryparam + " : " + queryvalue + startDate + endDate);
         
          querySnapshot.forEach((documentSnapshot) => {
            let tmpTip = {
                            amount: documentSnapshot.get('amount'),
                            createdDateTime: documentSnapshot.get("createdDateTime"),
                            team_uid: documentSnapshot.get("team_uid"),
                            uid: documentSnapshot.get("uid"),
                            teamName: documentSnapshot.get("teamName"),
                            note: documentSnapshot.get("note")
                          }
            myTips.push(tmpTip)                        
           
          })

            for (i=0; i<myTips.length; i++){
              // myTips[i].amount = parseFloat(myTips[i].amount);
              myTips[i].amount = parseFloat(myTips[i].amount);
              myTips[i].createdDateTime=(myTips[i].createdDateTime).toDate()
      
            }
            console.log('Length of new tips object:' + myTips.length);   
            // console.log('TIPS: ' + JSON.stringify(myTips));
      
            setAllTips(myTips);


    
        });       

}



//function to render the tip records
//  const renderTipRecords = () =>{
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.item_myTips}>{title}</Text>
    </View>
  );
  const renderTipRecords = ({ Record }) => {console.log('renderTipRecords '+ JSON.stringify(Record)); return(<Item title={Record.amount} />);}


 

  return (
    // <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', alignContent:'flex-start' }}>
    <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
                <Text>{startDate.toUTCString()}</Text>
              </View>
              <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
                <Text>{endDate.toUTCString()}</Text>
              </View>
        </View>


        <View style={{flexDirection:'row', alignItems: "center", justifyContent: "center" }}>
            <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
              <Button
                buttonStyle={styles.buttonBase}
                title="Choose Start Date"
                onPress={() => setStartOpen(true)}
                titleStyle={{ fontWeight: 'bold', fontSize: 16, color:'#000' }}
              />
              <DatePicker
                modal
                open={startOpen}
                date={startDate}
                onConfirm={(date) => {
                  setStartOpen(false)
                  setStartDate(date)
                }}
                onCancel={() => {
                  setStartOpen(false)
                }}
              />  
            </View>
          <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
            <Button
              buttonStyle={styles.buttonBase} 
              title="Choose End Date" 
              onPress={() => setEndOpen(true)}
              titleStyle={{ fontWeight: 'bold', fontSize: 16, color:'#000' }}
            />
            <DatePicker
              modal
              open={endOpen}
              date={endDate}
              onConfirm={(date) => {
                setEndOpen(false)
                setEndDate(date)
              }}
              onCancel={() => {
                setEndOpen(false)
              }}
            />  
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems: "center", justifyContent: "center" }}>

          <Button
            buttonStyle={styles.buttonBase}
            title="Get Tips"
            onPress={() => getTipsRangeDate('uid',global.userToken.uid)}
            titleStyle={{ fontWeight: 'bold', fontSize: 16, color:'#000' }}
          />

        </View>

          <FlatList
          label="Tips History"
          containerStyle={{width:'100%'}}
          data={allTips}
          renderItem={({ item }) => {
            // //{moment(item.createdDateTime).format(“dddd”)}
            let theDate = moment(item.createdDateTime).format('MM/DD/YY HH:mm');
            // //let theDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            // console.log('moment:' + moment(item.createdDateTime).format('dddd'));
            return(
              <View style={{flex:1, flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#eee', marginBottom:3}}>
                <View style={{flexDirection:'column', flex:.25, padding:2}}>
                  <Text>{theDate}</Text> 
                </View>
                <View style={{flexDirection:'column', flex:.25, padding:2}}>
                  <Text>${parseFloat(item.amount).toFixed(2)}</Text>
                </View>
                <View style={{flexDirection:'column', flex:.25, padding:2}}>
                  <Text>{item.teamName?item.teamName:item.team_uid}</Text>
                </View>
                <View style={{flexDirection:'column', flex:.25, padding:2}}>
                  <Text>{item.note}</Text>
                </View>
              </View>
            )
            // return(
            //   <View style={{flexDirection:'row'}}>
            //     <Text>{item.teamName}</Text>
            //   </View>
            // )            
          }}
          keyExtractor={(item, index) => index}
          style={{ flex: 1, margin: 20, height: 100 }}
          />


    </View>
  );
}

export default HistoryScreen;
