/**
 * App Configuration Constants
 */

export const CONFIG = {
  // Notification settings
  notification: {
    defaultFrequency: 3,           // Default: 3 notifications per day
    frequencyOptions: [1, 3, 5, 8], // Available frequency options
    defaultWakeHour: 7,            // 7 AM
    defaultSleepHour: 22,          // 10 PM
    minGapMinutes: 60,             // Minimum 1 hour between notifications
  },

  // Notification content variations
  notificationMessages: [
    "What emotion is arising right now?",
    "Pause. What's present in your body?",
    "Name what you feel.",
    "What sensation is here?",
    "Notice what's present.",
  ],

  // App metadata
  app: {
    name: "Emoti",
    version: "1.0.0",
    bundleId: {
      ios: "co.livingskillfully.emoti",
      android: "co.livingskillfully.emoti",
    },
  },

  // Storage keys
  storageKeys: {
    userProfile: '@emoti_user_profile',
    settings: '@emoti_settings',
    emotionLogs: '@emoti_emotion_logs',
    lastNotificationSchedule: '@emoti_last_schedule',
  },

  // UI settings
  ui: {
    splashDuration: 2500,      // How long splash screen shows (ms)
    notedDuration: 2500,       // How long "Noted" screen shows (ms)
    animationDuration: 300,    // General animation duration (ms)
  },
};

export default CONFIG;
