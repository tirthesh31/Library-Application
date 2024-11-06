import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import Borrowed from '../screens/Borrowed';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Optional: Hide the header for tabs
        tabBarActiveTintColor: '#000', // Color for active tab icon
        tabBarInactiveTintColor: '#888', // Color for inactive tab icon
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} /> // Home icon
          ),
        }}
      />
      <Tab.Screen
        name="Borrowed"
        component={Borrowed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} /> // Borrowed icon
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
