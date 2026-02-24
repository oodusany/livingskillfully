/**
 * App Navigator
 * Main navigation structure for the Emoti app
 */

import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  addNotificationResponseListener,
  removeNotificationListener,
  getLastNotificationResponse,
} from '../services/notificationService';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingNameScreen from '../screens/OnboardingNameScreen';
import OnboardingFrequencyScreen from '../screens/OnboardingFrequencyScreen';
import HomeScreen from '../screens/HomeScreen';
import EmotionLogScreen from '../screens/EmotionLogScreen';
import NotedScreen from '../screens/NotedScreen';
import MonthSummaryScreen from '../screens/MonthSummaryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navigationRef = useRef(null);

  useEffect(() => {
    // Handle notification tap when app is opened from notification
    const checkLastNotificationResponse = async () => {
      const response = await getLastNotificationResponse();
      if (response && response.notification.request.content.data?.screen) {
        const screen = response.notification.request.content.data.screen;
        if (navigationRef.current) {
          navigationRef.current.navigate(screen);
        }
      }
    };

    checkLastNotificationResponse();

    // Listen for notification responses while app is running
    const subscription = addNotificationResponseListener((response) => {
      console.log('Notification tapped:', response);
      const screen = response.notification.request.content.data?.screen;

      if (screen && navigationRef.current) {
        // Navigate to the screen specified in notification data
        navigationRef.current.navigate(screen);
      }
    });

    return () => {
      removeNotificationListener(subscription);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Hide header for all screens
          animation: 'fade',  // Smooth fade transitions
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="OnboardingName" component={OnboardingNameScreen} />
        <Stack.Screen name="OnboardingFrequency" component={OnboardingFrequencyScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmotionLog" component={EmotionLogScreen} />
        <Stack.Screen name="Noted" component={NotedScreen} />
        <Stack.Screen name="MonthSummary" component={MonthSummaryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
