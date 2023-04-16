import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts, Ubuntu_400Regular_Italic } from "@expo-google-fonts/ubuntu"
import { Register, LogIn, Planner, Introduction } from './screens';

import { paramList } from "./util"


const Stack = createNativeStackNavigator<paramList>()


export default function App() {

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular_Italic
  })

  if(!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Introduction">
        <Stack.Screen name='Introduction' component={Introduction}/>
        <Stack.Screen name='Register' component={Register}/>  
        <Stack.Screen name='LogIn' component={LogIn}/>
        <Stack.Screen name='Planner' component={Planner}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
