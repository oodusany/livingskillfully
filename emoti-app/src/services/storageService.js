/**
 * Storage Service
 * AsyncStorage wrapper for all data persistence operations
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

/**
 * Save user profile
 * @param {string} name - User's name
 * @returns {Promise<boolean>} Success status
 */
export const saveUserProfile = async (name) => {
  try {
    const profile = { name };
    await AsyncStorage.setItem(
      CONFIG.storageKeys.userProfile,
      JSON.stringify(profile)
    );
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

/**
 * Get user profile
 * @returns {Promise<Object|null>} User profile or null
 */
export const getUserProfile = async () => {
  try {
    const profileJSON = await AsyncStorage.getItem(CONFIG.storageKeys.userProfile);
    return profileJSON ? JSON.parse(profileJSON) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Save settings
 * @param {Object} settings - Settings object { frequency, wakeHour, sleepHour }
 * @returns {Promise<boolean>} Success status
 */
export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(
      CONFIG.storageKeys.settings,
      JSON.stringify(settings)
    );
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

/**
 * Get settings
 * @returns {Promise<Object|null>} Settings object or null
 */
export const getSettings = async () => {
  try {
    const settingsJSON = await AsyncStorage.getItem(CONFIG.storageKeys.settings);
    if (settingsJSON) {
      return JSON.parse(settingsJSON);
    }
    // Return default settings if none exist
    return {
      frequency: CONFIG.notification.defaultFrequency,
      wakeHour: CONFIG.notification.defaultWakeHour,
      sleepHour: CONFIG.notification.defaultSleepHour,
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      frequency: CONFIG.notification.defaultFrequency,
      wakeHour: CONFIG.notification.defaultWakeHour,
      sleepHour: CONFIG.notification.defaultSleepHour,
    };
  }
};

/**
 * Save emotion log
 * @param {Object} emotionLog - Emotion log object
 * @returns {Promise<boolean>} Success status
 */
export const saveEmotionLog = async (emotionLog) => {
  try {
    // Get existing logs
    const existingLogs = await getEmotionLogs();

    // Add new log with timestamp
    const newLog = {
      ...emotionLog,
      timestamp: emotionLog.timestamp || new Date().toISOString(),
      id: Date.now().toString(), // Simple ID generation
    };

    const updatedLogs = [...existingLogs, newLog];

    await AsyncStorage.setItem(
      CONFIG.storageKeys.emotionLogs,
      JSON.stringify(updatedLogs)
    );

    return true;
  } catch (error) {
    console.error('Error saving emotion log:', error);
    return false;
  }
};

/**
 * Get all emotion logs
 * @returns {Promise<Array>} Array of emotion logs
 */
export const getEmotionLogs = async () => {
  try {
    const logsJSON = await AsyncStorage.getItem(CONFIG.storageKeys.emotionLogs);
    return logsJSON ? JSON.parse(logsJSON) : [];
  } catch (error) {
    console.error('Error getting emotion logs:', error);
    return [];
  }
};

/**
 * Get emotion logs for a specific month
 * @param {number} year - Year (e.g., 2026)
 * @param {number} month - Month (0-11, JavaScript Date format)
 * @returns {Promise<Array>} Array of emotion logs for the month
 */
export const getEmotionLogsForMonth = async (year, month) => {
  try {
    const allLogs = await getEmotionLogs();
    return allLogs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return logDate.getFullYear() === year && logDate.getMonth() === month;
    });
  } catch (error) {
    console.error('Error getting emotion logs for month:', error);
    return [];
  }
};

/**
 * Clear all data
 * @returns {Promise<boolean>} Success status
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      CONFIG.storageKeys.userProfile,
      CONFIG.storageKeys.settings,
      CONFIG.storageKeys.emotionLogs,
      CONFIG.storageKeys.lastNotificationSchedule,
    ]);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Check if onboarding is complete
 * @returns {Promise<boolean>} True if onboarding is complete
 */
export const isOnboardingComplete = async () => {
  try {
    const profile = await getUserProfile();
    const settings = await getSettings();
    return !!(profile && profile.name && settings && settings.frequency);
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

export default {
  saveUserProfile,
  getUserProfile,
  saveSettings,
  getSettings,
  saveEmotionLog,
  getEmotionLogs,
  getEmotionLogsForMonth,
  clearAllData,
  isOnboardingComplete,
};
