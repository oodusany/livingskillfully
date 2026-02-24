/**
 * Settings Screen
 * Allows user to modify notification frequency and clear data
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { CONFIG } from '../constants/config';
import { useApp } from '../context/AppContext';
import { rescheduleNotifications, cancelAllNotifications } from '../services/notificationService';

const SettingsScreen = ({ navigation }) => {
  const { settings, saveSettings, clearAllData } = useApp();
  const [frequency, setFrequency] = useState(CONFIG.notification.defaultFrequency);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Load current settings
  useEffect(() => {
    if (settings) {
      setFrequency(settings.frequency);
    }
  }, [settings]);

  // Save frequency when it changes and reschedule notifications
  useEffect(() => {
    const updateFrequency = async () => {
      if (settings && frequency !== settings.frequency) {
        setIsRescheduling(true);

        try {
          // Save new settings
          await saveSettings({
            ...settings,
            frequency,
          });

          // Reschedule notifications with new frequency
          await rescheduleNotifications(
            frequency,
            settings.wakeHour || CONFIG.notification.defaultWakeHour,
            settings.sleepHour || CONFIG.notification.defaultSleepHour
          );

          console.log('Notifications rescheduled successfully');
        } catch (error) {
          console.error('Error rescheduling notifications:', error);
          Alert.alert(
            'Rescheduling Error',
            'There was an issue updating your reminders. Please try again.',
            [{ text: 'OK' }]
          );
        } finally {
          setIsRescheduling(false);
        }
      }
    };

    updateFrequency();
  }, [frequency]);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all your emotion logs and settings? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllData();
            if (success) {
              // Cancel all notifications
              await cancelAllNotifications();

              Alert.alert('Data Cleared', 'All your data has been cleared.', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Welcome'),
                },
              ]);
            } else {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Daily Frequency</Text>
            <Text style={styles.settingValue}>{frequency} times per day</Text>
          </View>

          <View style={styles.frequencyOptions}>
            {CONFIG.notification.frequencyOptions.map((freq) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.frequencyButton,
                  frequency === freq && styles.frequencyButtonSelected,
                ]}
                onPress={() => setFrequency(freq)}
              >
                <Text
                  style={[
                    styles.frequencyText,
                    frequency === freq && styles.frequencyTextSelected,
                  ]}
                >
                  {freq}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.helpText}>
            You'll receive random reminders throughout the day to check in with your emotions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearData}
          >
            <Text style={styles.dangerButtonText}>Clear All Records</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Emoti v{CONFIG.app.version}</Text>
          <Text style={styles.footerSubtext}>Emotional awareness practice</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    fontSize: 32,
    color: COLORS.forest,
  },
  title: {
    fontSize: 20,
    color: COLORS.forest,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.ash,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 14,
    color: COLORS.ash,
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 18,
    color: COLORS.forest,
    fontWeight: '500',
  },
  frequencyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
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
  helpText: {
    fontSize: 14,
    color: COLORS.ash,
    lineHeight: 20,
  },
  dangerButton: {
    backgroundColor: COLORS.rose,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.ash,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.ash,
  },
});

export default SettingsScreen;
