import {useEffect, useState} from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

// import { navigation } from '@react-navigation/native';
import { Button, CheckBox, Icon, Card, Input } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import {moment} from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import styles from "../utils/styles";
import firestore from "@react-native-firebase/firestore";


function HistoryScreen({ navigation }) {
  const [allTips, setAllTips]=useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

//Refresh the screen on navigation listener thing

//function to pull the records between the dates
const getTipsRangeDate = async (queryparam, queryvalue) => {
  // firebase
  // if (queryvalue == ''){
  //   return false
  // }
    let myTips = [];
    // let date24 = moment().subtract(24, "hours").toDate();
    console.log(startDate);
    console.log(firestore.Timestamp.fromDate(startDate));
    firestore()
    .collection("Tips")
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
                        uid: documentSnapshot.get("uid")
                      }
        myTips.push(tmpTip)                        
       
      });
      for (i=0; i<myTips.length; i++){
        // myTips[i].amount = parseFloat(myTips[i].amount);
        myTips[i].amount = parseFloat(myTips[i].amount);
        myTips[i].createdDateTime=(myTips[i].createdDateTime).toDate()

      }
      console.log('Length of new tips object:' + myTips.length);   
      console.log('TIPS: ' + JSON.stringify(myTips));

      setAllTips(myTips);

      // teamTipsTotal=myTips.reduce((total, currentValue) => total = total + (currentValue.amount),0);
    
      // result = myTips.reduce((total, currentValue) => total = total + (currentValue.amount),0);
      // console.log('in getTipsTotal, with query for: ' + queryparam + ': ' + queryvalue + ', the total is: ' + result);
      // if (queryparam == 'uid'){
      //   setMyTipsTotal(parseFloat(result).toFixed(2))
      // }else{
      //   setTeamTipsTotal(parseFloat(result).toFixed(2));
      // }
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
    <View style={{ flex: 1, flexDirection:'column', alignItems:'flex-start', alignContent:'flex-start' }}>
        <View style={{ flex: 1, flexDirection:'row', alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
                <Text>{startDate.toUTCString()}</Text>
              </View>
              <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
                <Text>{endDate.toUTCString()}</Text>
              </View>
        </View>


        <View style={{ flex: 1, flexDirection:'row', alignItems: "center", justifyContent: "center" }}>
            <View style={{ flex: .5, alignItems: "center", justifyContent: "center" }}>
              <Button title="Choose Start Date" onPress={() => setStartOpen(true)} />
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
            <Button title="Choose End Date" onPress={() => setEndOpen(true)} />
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
        <View style={{ flex: 1, flexDirection:'row', alignItems: "center", justifyContent: "center" }}>
        {/* <View style={{ flex: 0.2, flexDirection: "column" }}> */}
          <Button
            buttonStyle={styles.buttonBase}
            title="Get Tips"
            onPress={() => getTipsRangeDate('uid',global.userToken.uid)}
            titleStyle={{ fontWeight: 'bold', fontSize: 18, color:'#000' }}
          />
        {/* </View> */}
          {/* 
          Add a button to run the query 
          */}
        </View>
        <ScrollView>
          <FlatList
          label="Tips History"
          data={allTips}
          renderItem={(item)=>{renderTipRecords}}
          keyExtractor={(item, index) => index}
          style={{ flex: 1, margin: 20, height: 100 }}
          />
          {/* 
          Create a new component called TipRecords that is the repeat of all your views
          {renderTipRecords}
          
          */}

        </ScrollView>
    </View>
  );
}

export default HistoryScreen;
