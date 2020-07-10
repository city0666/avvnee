import 'react-native-gesture-handler';
import React, { useState, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from './Screens/map/map'
import RootStackScreen from './Screens/Auth/RootStackScreen';
import { SplashScreen } from 'expo';

import {Provider as AuthProvider} from './context/AuthContext';
import {Context as AuthContext} from './context/AuthContext';
import ScreenRoute from './Screens/Auth/ScreenInner';


SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 2000);



const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();


const App = () => {
  const { state} = useContext(AuthContext);
  
  const token = state.token;

  return (

    <NavigationContainer>
    {token == null ? (<RootStackScreen></RootStackScreen>):(<ScreenRoute></ScreenRoute>)}

 
    </NavigationContainer>
  );
}

export default () =>{
  return(
  <AuthProvider>

  <App/>
  </AuthProvider>

  )
};