import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GenerateBarcodeScreen from '../screens/GenerateBarcodeScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import ShowBarcodeScreen from '../screens/ShowBarcodeScreen';

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
                name="Generate Barcode"
                component={GenerateBarcodeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="barcode"
                            size={24}
                            color={focused ? '#007aff' : '#ccc'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Scan Barcode"
                component={ScanBarcodeScreen}
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
                name="Show Barcode"
                component={ShowBarcodeScreen}
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