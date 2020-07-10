import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import LgDemo from './LgDemo';
import map from '../map/map';
import NewTwo from '../map/NewTwo';
import Driverhere from '../map/Driverhere';
const RootStack = createStackNavigator();


const RootStackScreen = ({navigation}) => (

    <RootStack.Navigator headerMode='none'>
     <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
     <RootStack.Screen name = "SignUpScreen" component={SignUpScreen}/>
     <RootStack.Screen name = "SignInScreen" component={SignInScreen}/>
     <RootStack.Screen name = "LgDemo" component={LgDemo}/>
     <RootStack.Screen name = "map" component={map}/>
     <RootStack.Screen name = "Driverhere" component={Driverhere}/>
     <RootStack.Screen name = "NewTwo" component={NewTwo}/>



   
     
    </RootStack.Navigator>
);

export default RootStackScreen;