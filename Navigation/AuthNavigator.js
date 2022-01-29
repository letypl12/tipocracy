import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/Login";
import SignupScreen from "../Screens/Signup";

const Auth = createNativeStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false,
    }}
    headerMode="none"
  >
    <Auth.Screen name="Login" component={LoginScreen} />
    <Auth.Screen name="Signup" component={SignupScreen} />
  </Auth.Navigator>
);

const AuthNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="AuthTab"
          component={AuthStack}
          options={{ tabBarLabel: "Login" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigator;
