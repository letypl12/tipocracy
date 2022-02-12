import React, { useEffect, useContext, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../Screens/Home";
import SettingsScreen from "../Screens/Settings";
import TeamsScreen from "../Screens/Teams";
import ProfileScreen from "../Screens/Profile";
import AuthProfileScreen from "../Screens/AuthProfile";
import TeamsCreateScreen from "../Screens/TeamsCreate";
import TeamsEditScreen from "../Screens/TeamsEdit";
import TipsScreen from "../Screens/Tips";

import HistoryScreen from "../Screens/History";

const HomeStack = createNativeStackNavigator();
function HomeNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{ team_uid: '' }} options={{headerShown: false}}/>
        <HomeStack.Screen name="Settings" component={SettingsScreen} options={{headerStyle:{backgroundColor:'#FFE500'}}}/> 
        <HomeStack.Screen name="Profile" component={ProfileScreen} initialParams={{ reload: false }} options={{headerStyle:{backgroundColor:'#FFE500'}}}/>        
        <HomeStack.Screen name="Login Info" component={AuthProfileScreen} initialParams={{ reload: false }} options={{headerStyle:{backgroundColor:'#FFE500'}}}/>  
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}

const TeamsStack = createNativeStackNavigator();
function TeamsNav() {
  return (
    <TeamsStack.Navigator>
      <TeamsStack.Group>
        <TeamsStack.Screen name="Teams" component={TeamsScreen} initialParams={{ reload: false }} options={{headerStyle:{backgroundColor:'#FFE500'}}}/>
        <TeamsStack.Screen name="Create A Team" component={TeamsCreateScreen}  options={{headerStyle:{backgroundColor:'#FFE500'}}}/>
        <TeamsStack.Screen name="TeamsEdit" component={TeamsEditScreen}  options={{headerStyle:{backgroundColor:'#FFE500'}}}/>
        <TeamsStack.Screen name="Tips" component={TipsScreen}  options={{headerStyle:{backgroundColor:'#FFE500'}}}/>
      </TeamsStack.Group>
    </TeamsStack.Navigator>
  );
}

const MainTabNavigator = () => {
  // const {signOut} = useContext(AuthContext);
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator 
          screenOptions={{ headerShown: false }}
          tabBarOptions={{
            activeTintColor: '#000',
            inactiveTintColor: 'blue',
            activeBackgroundColor: '#FFE500',
            inactiveBackgroundColor: '#FFE500',
                style: {
                      backgroundColor: '#FFE500',
                      paddingBottom: 3
                }
         }}>
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
            headerStyle: {
              backgroundColor: '#FFE500',
            },
            headerTintColor: '#fff',
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
            headerStyle: {
              backgroundColor: '#FFE500',
            },
            headerTintColor: '#fff',
          }}
        />
        <Tab.Screen
          name="Add A Tip"
          component={TipsScreen}
          options={{
            tabBarLabel: "Add A Tip",
            headerShown: true,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "cash" : "cash-outline"}
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: '#FFE500',
            },
            headerTintColor: '#000',
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerShown: true,
            tabBarLabel: "History",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: '#FFE500',
            },
            headerTintColor: '#000',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            tabBarLabel: "Settings",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                color={color}
                size={size}
              />
            ),
            headerStyle: {
              backgroundColor: '#FFE500',
            },
            headerTintColor: '#000',
          }}
        />        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabNavigator;
