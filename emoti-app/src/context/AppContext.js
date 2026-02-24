/**
 * App Context
 * Global state management for user profile, settings, and emotion logs
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getUserProfile,
  getSettings,
  getEmotionLogs,
  saveUserProfile as saveUserProfileStorage,
  saveSettings as saveSettingsStorage,
  saveEmotionLog as saveEmotionLogStorage,
  clearAllData as clearAllDataStorage,
  isOnboardingComplete,
} from '../services/storageService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Load data on app startup
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [profile, settingsData, logs, onboardingComplete] = await Promise.all([
        getUserProfile(),
        getSettings(),
        getEmotionLogs(),
        isOnboardingComplete(),
      ]);

      setUserProfile(profile);
      setSettings(settingsData);
      setEmotionLogs(logs);
      setHasCompletedOnboarding(onboardingComplete);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserProfile = async (name) => {
    try {
      const success = await saveUserProfileStorage(name);
      if (success) {
        setUserProfile({ name });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving user profile:', error);
      return false;
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      const success = await saveSettingsStorage(newSettings);
      if (success) {
        setSettings(newSettings);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  };

  const saveEmotionLog = async (emotionLog) => {
    try {
      const success = await saveEmotionLogStorage(emotionLog);
      if (success) {
        // Reload logs to get updated list
        const logs = await getEmotionLogs();
        setEmotionLogs(logs);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving emotion log:', error);
      return false;
    }
  };

  const clearAllData = async () => {
    try {
      const success = await clearAllDataStorage();
      if (success) {
        setUserProfile(null);
        setSettings(null);
        setEmotionLogs([]);
        setHasCompletedOnboarding(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
  };

  const value = {
    userProfile,
    settings,
    emotionLogs,
    isLoading,
    hasCompletedOnboarding,
    saveUserProfile,
    saveSettings,
    saveEmotionLog,
    clearAllData,
    completeOnboarding,
    reloadData: loadData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
