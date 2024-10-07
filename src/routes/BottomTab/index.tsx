import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenNames } from "../ScreenNames";
import { Icons } from "../../Assets";
import { Image } from "react-native";
import HomeScreen from "../../Screens/Home";
import AccountScreen from "../../Screens/Account";
import FavouriteScreen from "../../Screens/Favourite";
import MenuScreen from "../../Screens/Menu";

const Tab = createBottomTabNavigator();

type BottomTabProps = {};

class BottomTab extends Component<BottomTabProps> {
    render() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        switch (route.name) {
                            case ScreenNames.Home:
                                iconName = focused ? Icons.homeSelected : Icons.homeUnSelected;
                                break;
                            case ScreenNames.Account:
                                iconName = focused ? Icons.accountSelected : Icons.accountUnSelected;
                                break;
                            case ScreenNames.Favourite:
                                iconName = focused ? Icons.favouriteSelected : Icons.favouriteUnSelected;
                                break;
                            case ScreenNames.Menu:
                                iconName = focused ? Icons.menuSelected : Icons.menuUnSelected;
                                break;
                            default:
                                iconName = Icons.homeSelected;
                                break;
                        }

                        return (
                            <Image
                                source={iconName}
                                style={{ width: 20, height: 20 }}
                            />
                        );
                    },
                })}
            >   
             <Tab.Screen
            component={MenuScreen}
            name={ScreenNames.Menu}
            options={{ headerShown: false }}
        />
                <Tab.Screen
                    component={HomeScreen}
                    name={ScreenNames.Home}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    component={AccountScreen}
                    name={ScreenNames.Account}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    component={FavouriteScreen}
                    name={ScreenNames.Favourite}
                    options={{ headerShown: false }}
                />
               
            </Tab.Navigator>
        );
    }
}

export default BottomTab;
