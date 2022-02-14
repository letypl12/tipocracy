import {useEffect, useState} from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// import { navigation } from '@react-navigation/native';
import { Button, CheckBox, Icon, Card, Input } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import {moment} from 'moment';
import { ScrollView } from "react-native-gesture-handler";


function HistoryScreen({ navigation }) {
  const [startOpen, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endOpen, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

//Refresh the screen on navigation listener thing

//function to pull the records between the dates


//function to render the tip records
 const renderTipRecords = () =>{

 }

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
          {/* 
          Add a button to run the query 
          */}
        </View>
        <ScrollView>
          {/* 
          Create a new component called TipRecords that is the repeat of all your views
          {renderTipRecords}
          
          */}

        </ScrollView>
    </View>
  );
}

export default HistoryScreen;
