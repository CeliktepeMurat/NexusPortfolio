import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { WalletConnectProvider } from "../src/context/WalletConnectProvider";
import SignupScreen from "../src/screens/SignupScreen";
import SigninScreen from "../src/screens/SigninScreen";
import HomeScreen from "../src/screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <WalletConnectProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Signup'>
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Signin' component={SigninScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletConnectProvider>
  );
}
