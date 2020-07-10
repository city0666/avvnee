import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Map from '../map/map';
import LgDemo from './LgDemo';

const ScreenRoute = createStackNavigator();

// eslint-disable-next-line no-unused-vars
const ScreenRouteInner = ({ navigation }) => (

    <ScreenRoute.Navigator >
            {/* <ScreenRoute.Screen name="LgDemo" component={LgDemo} /> */}

        <ScreenRoute.Screen name="map" component={Map} />

      

        </ScreenRoute.Navigator>    

);

export default ScreenRouteInner;
