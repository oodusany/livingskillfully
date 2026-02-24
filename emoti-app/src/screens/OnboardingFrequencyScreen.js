/**
 * Onboarding Frequency Screen
 * Let's user select notification frequency
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { CONFIG } from '../constants/config';
import { useApp } from '../context/AppContext';
import {
  requestNotificationPermissions,
  scheduleAllNotifications,
} from '../services/notificationService';

const OnboardingFrequencyScreen = ({ navigation, route }) => {
  const [selectedFrequency, setSelectedFrequency] = useState(CONFIG.notification.defaultFrequency);
  const [isLoading, setIsLoading] = useState(false);
  const { name } = route.params || {};
  const { saveSettings, completeOnboarding } = useApp();

  const handleContinue = async () => {
    setIsLoading(true);

    try {
      // Save settings to storage
      await saveSettings({
        frequency: selectedFrequency,
        wakeHour: CONFIG.notification.defaultWakeHour,
        sleepHour: CONFIG.notification.defaultSleepHour,
      });

      // Request notification permissions
      const hasPermission = await requestNotificationPermissions();

      if (!hasPermission) {
        Alert.alert(
          'Notifications Not Enabled',
          'You won\'t receive reminders to check in with your emotions. You can enable notifications later in Settings.',
          [
            {
              text: 'Continue Anyway',
              onPress: async () => {
                await completeOnboarding();
                navigation.navigate('Home');
              },
            },
            {
              text: 'Try Again',
              onPress: () => setIsLoading(false),
            },
          ]
        );
        return;
      }

      // Schedule notifications
      try {
        await scheduleAllNotifications(
          selectedFrequency,
          CONFIG.notification.defaultWakeHour,
          CONFIG.notification.defaultSleepHour
        );
        console.log('Notifications scheduled successfully');
      } catch (error) {
        console.error('Error scheduling notifications:', error);
        Alert.alert(
          'Scheduling Error',
          'There was an issue scheduling your reminders. You can try again in Settings.',
          [{ text: 'OK' }]
        );
      }

      // Mark onboarding as complete
      await completeOnboarding();

      // Navigate to Home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during onboarding completion:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>How often would you like reminders?</Text>
        <Text style={styles.subtitle}>Times per day</Text>

        <View style={styles.frequencyOptions}>
          {CONFIG.notification.frequencyOptions.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.frequencyButton,
                selectedFrequency === freq && styles.frequencyButtonSelected,
              ]}
              onPress={() => setSelectedFrequency(freq)}
            >
              <Text
                style={[
                  styles.frequencyText,
                  selectedFrequency === freq && styles.frequencyTextSelected,
                ]}
              >
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Setting up...' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 28,
    color: COLORS.forest,
    marginBottom: 8,
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.ash,
    marginBottom: 32,
  },
  frequencyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  frequencyButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.ash,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frequencyButtonSelected: {
    backgroundColor: COLORS.forest,
    borderColor: COLORS.forest,
  },
  frequencyText: {
    fontSize: 24,
    color: COLORS.forest,
    fontWeight: '500',
  },
  frequencyTextSelected: {
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.forest,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.ash,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingFrequencyScreen;
