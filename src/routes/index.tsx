


import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Splash from '../Screens/Splash';
import BottomTab from './BottomTab';
import Search from '../Screens/Search';
import Chat from '../Screens/Chat'

export default class Routes extends Component {
    render() {
        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>

                    <Stack.Screen name="Splash" component={Splash} />
 
                    <Stack.Screen name='BottomTab' component={BottomTab} />
                    <Stack.Screen name='Search' component={Search} />
                    <Stack.Screen name='Chat' component={Chat} />
                    



                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})





