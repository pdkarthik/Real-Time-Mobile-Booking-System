import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import ExpertListingScreen from './src/screens/ExpertListingScreen';
import ExpertDetailScreen from './src/screens/ExpertDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import MyBookingsScreen from './src/screens/MyBookingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack for the Home Tab
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="ExpertList">
      <Stack.Screen 
        name="ExpertList" 
        component={ExpertListingScreen} 
        options={{ title: 'Find an Expert' }} 
      />
      <Stack.Screen 
        name="ExpertDetail" 
        component={ExpertDetailScreen} 
        options={{ title: 'Expert Details' }} 
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ title: 'Book Session' }} 
      />
    </Stack.Navigator>
  );
}

// Main App Navigation
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1976d2',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ 
            title: 'Experts',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>👨‍💼</Text>
            )
          }} 
        />
        <Tab.Screen 
          name="MyBookings" 
          component={MyBookingsScreen} 
          options={{ 
            title: 'My Bookings',
            headerShown: true, // Show header for this tab
            tabBarIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>📅</Text>
            )
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
