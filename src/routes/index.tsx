


import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
// import LoginPage from '../components/LoginPage'
// import CreateAccpage from '../components/CreateAccpage'
// import FirstPage from '../components/FirstPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
// import OtpPage from '../components/OtpPage'
// import VerifyOtp from '../components/verifyEmail'
// import Splash from '../components/Splash'
// import Tutorial from '../components/Tutorial'
// import Tutorial from '../Screens/Tutorial';
import Splash from '../Screens/Splash';
import BottomTab from './BottomTab';
import Search from '../Screens/Search';
import Chat from '../Screens/Chat'
// import LoginPage from '../Screens/LoginPage';
// import ForgotPassword from '../Screens/ForgetPassword';
// import ResetPassword from '../Screens/ResetPassword';
// import AddPhone from '../Screens/AddPhone';
// import Verifyotp from '../Screens/Verifyotp';
// import HomeScreen from '../Screens/HomeScreen';

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





