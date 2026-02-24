/**
 * Notification Service
 * Handles all notification-related operations
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';
import {
  generateRandomTimes,
  getRandomNotificationMessage,
  calculateTriggerDate,
  shouldRegenerateNotifications,
} from './schedulingService';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 * @returns {Promise<boolean>} True if granted, false otherwise
 */
export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }

    // Configure Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Emotion Check-ins',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2E4A42',
        sound: 'default',
        enableVibrate: true,
      });
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

/**
 * Check if notifications are enabled
 * @returns {Promise<boolean>} True if enabled
 */
export const areNotificationsEnabled = async () => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking notification status:', error);
    return false;
  }
};

/**
 * Schedule a single notification
 * @param {Object} time - Time object {hour, minute}
 * @param {string} message - Notification message
 * @returns {Promise<string>} Notification ID
 */
const scheduleNotification = async (time, message) => {
  try {
    const triggerDate = calculateTriggerDate(time.hour, time.minute);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Emoti',
        body: message,
        sound: 'default',
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          screen: 'EmotionLog',
          timestamp: new Date().toISOString(),
        },
      },
      trigger: {
        type: 'date',
        date: triggerDate,
      },
    });

    console.log(`Scheduled notification ${notificationId} for ${time.hour}:${time.minute}`);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
};

/**
 * Schedule all notifications for the day
 * @param {number} frequency - Number of notifications per day
 * @param {number} wakeHour - Wake hour
 * @param {number} sleepHour - Sleep hour
 * @returns {Promise<Array>} Array of notification IDs
 */
export const scheduleAllNotifications = async (frequency, wakeHour, sleepHour) => {
  try {
    // Check permissions first
    const hasPermission = await areNotificationsEnabled();
    if (!hasPermission) {
      console.log('Notification permissions not granted, requesting...');
      const granted = await requestNotificationPermissions();
      if (!granted) {
        throw new Error('Notification permissions not granted');
      }
    }

    // Generate random times
    const times = generateRandomTimes(frequency, wakeHour, sleepHour);
    console.log('Generated notification times:', times);

    // Cancel existing notifications
    await cancelAllNotifications();

    // Schedule new notifications
    const notificationIds = [];
    for (const time of times) {
      const message = getRandomNotificationMessage();
      const notificationId = await scheduleNotification(time, message);
      notificationIds.push(notificationId);
    }

    // Store notification IDs and last schedule date
    await AsyncStorage.setItem(
      '@emoti_notification_ids',
      JSON.stringify(notificationIds)
    );
    await AsyncStorage.setItem(
      CONFIG.storageKeys.lastNotificationSchedule,
      new Date().toISOString()
    );

    console.log(`Successfully scheduled ${notificationIds.length} notifications`);
    return notificationIds;
  } catch (error) {
    console.error('Error scheduling all notifications:', error);
    throw error;
  }
};

/**
 * Cancel all scheduled notifications
 * @returns {Promise<void>}
 */
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem('@emoti_notification_ids');
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Error cancelling notifications:', error);
  }
};

/**
 * Reschedule notifications (called when settings change)
 * @param {number} frequency - New frequency
 * @param {number} wakeHour - New wake hour
 * @param {number} sleepHour - New sleep hour
 * @returns {Promise<Array>} Array of new notification IDs
 */
export const rescheduleNotifications = async (frequency, wakeHour, sleepHour) => {
  console.log(`Rescheduling notifications: ${frequency}x per day, ${wakeHour}-${sleepHour}`);
  return await scheduleAllNotifications(frequency, wakeHour, sleepHour);
};

/**
 * Check and regenerate notifications if needed (called on app startup)
 * @param {number} frequency - Notification frequency
 * @param {number} wakeHour - Wake hour
 * @param {number} sleepHour - Sleep hour
 * @returns {Promise<void>}
 */
export const checkAndRegenerateNotifications = async (frequency, wakeHour, sleepHour) => {
  try {
    const lastScheduleDate = await AsyncStorage.getItem(
      CONFIG.storageKeys.lastNotificationSchedule
    );

    if (shouldRegenerateNotifications(lastScheduleDate)) {
      console.log('New day detected, regenerating notifications');
      await scheduleAllNotifications(frequency, wakeHour, sleepHour);
    } else {
      console.log('Notifications already scheduled for today');

      // Verify notifications are actually scheduled
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      if (scheduledNotifications.length === 0) {
        console.log('No notifications found, rescheduling...');
        await scheduleAllNotifications(frequency, wakeHour, sleepHour);
      }
    }
  } catch (error) {
    console.error('Error checking and regenerating notifications:', error);
  }
};

/**
 * Get all scheduled notifications (for debugging)
 * @returns {Promise<Array>} Array of scheduled notifications
 */
export const getScheduledNotifications = async () => {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log(`Found ${notifications.length} scheduled notifications`);
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
};

/**
 * Add notification received listener
 * @param {Function} callback - Callback function
 * @returns {Object} Subscription object
 */
export const addNotificationReceivedListener = (callback) => {
  return Notifications.addNotificationReceivedListener(callback);
};

/**
 * Add notification response listener (when user taps notification)
 * @param {Function} callback - Callback function
 * @returns {Object} Subscription object
 */
export const addNotificationResponseListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};

/**
 * Remove notification listener
 * @param {Object} subscription - Subscription object to remove
 */
export const removeNotificationListener = (subscription) => {
  if (subscription) {
    subscription.remove();
  }
};

/**
 * Get last notification response (for deep linking)
 * @returns {Promise<Object|null>} Last notification response or null
 */
export const getLastNotificationResponse = async () => {
  try {
    return await Notifications.getLastNotificationResponseAsync();
  } catch (error) {
    console.error('Error getting last notification response:', error);
    return null;
  }
};

export default {
  requestNotificationPermissions,
  areNotificationsEnabled,
  scheduleAllNotifications,
  cancelAllNotifications,
  rescheduleNotifications,
  checkAndRegenerateNotifications,
  getScheduledNotifications,
  addNotificationReceivedListener,
  addNotificationResponseListener,
  removeNotificationListener,
  getLastNotificationResponse,
};
