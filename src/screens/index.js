import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import { Colors } from '../Styles';

const Top = createMaterialTopTabNavigator();

const StackNavigator = () => {
    return (
        <Top.Navigator tabBarOptions={{
            activeTintColor: Colors.text,
            inactiveTintColor: Colors.text,
            indicatorStyle: {backgroundColor: Colors.text, height: 2},
            style: {backgroundColor: Colors.foreground}
        }}>
            <Top.Screen name="Home" component={HomeScreen} options={{title: "Liste"}}/>
            <Top.Screen name="Map" component={MapScreen} options={{title: "Carte"}}/>
        </Top.Navigator>
    )
}

export default StackNavigator;