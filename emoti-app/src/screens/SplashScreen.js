/**
 * Splash Screen
 * Initial loading screen shown on app startup
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { CONFIG } from '../constants/config';
import { useApp } from '../context/AppContext';
import { checkAndRegenerateNotifications } from '../services/notificationService';

const SplashScreen = ({ navigation }) => {
  const { hasCompletedOnboarding, isLoading, settings } = useApp();

  useEffect(() => {
    // Wait for data to load
    if (isLoading) return;

    // Check and regenerate notifications if needed
    const initializeNotifications = async () => {
      if (hasCompletedOnboarding && settings) {
        try {
          await checkAndRegenerateNotifications(
            settings.frequency || CONFIG.notification.defaultFrequency,
            settings.wakeHour || CONFIG.notification.defaultWakeHour,
            settings.sleepHour || CONFIG.notification.defaultSleepHour
          );
        } catch (error) {
          console.error('Error initializing notifications:', error);
        }
      }
    };

    initializeNotifications();

    // Navigate after 2.5 seconds
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        navigation.replace('Home');
      } else {
        navigation.replace('Welcome');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, hasCompletedOnboarding, isLoading, settings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emoti</Text>
      <Text style={styles.subtitle}>Emotional awareness practice</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.linen,
    fontWeight: '300',
  },
});

export default SplashScreen;
