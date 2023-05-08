import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts, Ubuntu_400Regular_Italic } from "@expo-google-fonts/ubuntu"
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Register, LogIn, Planner, Introduction, DashBoard } from './screens';

import { stackParamList, getToken, ErrorBoundary, tabParamList, colors } from "./util"


const Stack = createNativeStackNavigator<stackParamList>()

const Tab = createBottomTabNavigator<tabParamList>()


export default function App() {

  let [token, setToken] = React.useState<string | null>(null)
  let [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  React.useEffect(() => {
    let checkToken = async () => {
      try {
        let tk = await getToken('@jwtToken')

        if(tk) {
          setToken(tk)
        }
        
      } catch(e) {
        setErrorMsg(e.message)
      }
    }

    checkToken()
  }, [])

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular_Italic
  })

  if(!fontsLoaded) {
    return null
  }

  return (
    <ErrorBoundary fallback={<>{errorMsg}</>}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={token ? 'App' : 'Introduction'}>
          <Stack.Screen name='Introduction' component={Introduction}/>
          <Stack.Screen name='Register' component={Register}/>  
          <Stack.Screen name='LogIn' component={LogIn}/>
          <Stack.Screen name='App' component={TabNavigation}/>  
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}

function TabNavigation(): React.ReactElement {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, size}) => {
        let iconName;

        if(route.name === 'Dashboard'){
          iconName = focused ? 'view-dashboard' : 'view-dashboard-outline'
        }

        if(route.name === 'Planner') {
          iconName = focused ? 'scale-balance' : 'scale-unbalanced'
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={colors.primary}/>

      },

      headerShown: false,
      tabBarActiveTintColor: colors.subtle,
      tabBarInactiveTintColor: colors.dark,
    })} initialRouteName='Dashboard'>
      <Tab.Screen name='Dashboard' component={DashBoard}></Tab.Screen>
      <Tab.Screen name='Planner' component={Planner}></Tab.Screen>
    </Tab.Navigator>
  )
}
