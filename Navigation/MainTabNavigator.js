import React, { useEffect, useContext, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../Screens/Home";
import TeamsScreen from "../Screens/Teams";
import TeamsChoiceScreen from "../Screens/TeamsChoice";
import TeamsCreateScreen from "../Screens/TeamsCreate";
import TeamsEditScreen from "../Screens/TeamsEdit";
import TipsScreen from "../Screens/Tips";

import HistoryScreen from "../Screens/History";

const HomeStack = createNativeStackNavigator();
function HomeNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

const TeamsStack = createNativeStackNavigator();
function TeamsNav() {
  return (
    <TeamsStack.Navigator>
      <TeamsStack.Group>
        <TeamsStack.Screen name="Teams" component={TeamsScreen} />
        <TeamsStack.Screen name="Choose A Team" component={TeamsChoiceScreen} />
        <TeamsStack.Screen name="Create A Team" component={TeamsCreateScreen} />
        <TeamsStack.Screen name="Edit A Team" component={TeamsEditScreen} />
        <TeamsStack.Screen name="Tips" component={TipsScreen} />
      </TeamsStack.Group>
    </TeamsStack.Navigator>
  );
}

const MainTabNavigator = () => {
  // const {signOut} = useContext(AuthContext);
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeNav}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TeamsTab"
          component={TeamsNav}
          options={{
            tabBarLabel: "Teams",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TipsTab"
          component={TipsScreen}
          options={{
            tabBarLabel: "Add A Tip",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "cash" : "cash-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="HistoryTab"
          component={HistoryScreen}
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;
