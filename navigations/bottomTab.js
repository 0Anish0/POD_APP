import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GenerateQrCode from '../screens/generateQrCode';
import ScanQrCode from '../screens/scanQrCode';
import showQrCode from '../screens/showQrCode';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007aff',
                tabBarInactiveTintColor: '#ccc',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}
        >
            <Tab.Screen
                name="Generate QR Code"
                component={GenerateQrCode}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="QrCode"
                            size={24}
                            color={focused ? '#007aff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan QR Code"
                component={ScanQrCode}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="scan"
                            size={24}
                            color={focused ? '#007aff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Show QR Code"
                component={showQrCode}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="eye"
                            size={24}
                            color={focused ? '#007aff' : '#ccc'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;