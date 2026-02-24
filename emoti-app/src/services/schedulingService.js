/**
 * Scheduling Service
 * Handles randomization algorithm for notification times
 */

import { CONFIG } from '../constants/config';

/**
 * Generate random notification times for a day
 * @param {number} frequency - Number of notifications per day (1, 3, 5, 8)
 * @param {number} wakeHour - Wake hour (0-23)
 * @param {number} sleepHour - Sleep hour (0-23)
 * @returns {Array} Array of {hour, minute} objects
 */
export const generateRandomTimes = (frequency, wakeHour = 7, sleepHour = 22) => {
  // Validate inputs
  if (frequency < 1 || frequency > 8) {
    throw new Error('Frequency must be between 1 and 8');
  }

  if (wakeHour < 0 || wakeHour > 23 || sleepHour < 0 || sleepHour > 23) {
    throw new Error('Wake and sleep hours must be between 0 and 23');
  }

  if (wakeHour >= sleepHour) {
    throw new Error('Wake hour must be before sleep hour');
  }

  // Calculate available time window in minutes
  const availableMinutes = (sleepHour - wakeHour) * 60;
  const minGapMinutes = CONFIG.notification.minGapMinutes;

  console.log(`🕐 Scheduling notifications between ${wakeHour}:00 (${wakeHour > 12 ? wakeHour - 12 : wakeHour}${wakeHour >= 12 ? 'PM' : 'AM'}) and ${sleepHour}:00 (${sleepHour > 12 ? sleepHour - 12 : sleepHour}PM)`);
  console.log(`📊 Available window: ${availableMinutes} minutes (${Math.floor(availableMinutes / 60)} hours)`);

  // Check if we have enough time for all notifications with minimum gaps
  const requiredMinutes = frequency * minGapMinutes;
  if (requiredMinutes > availableMinutes) {
    throw new Error(
      `Not enough time to schedule ${frequency} notifications with ${minGapMinutes} minute gaps`
    );
  }

  // Divide the day into segments
  const segmentSize = availableMinutes / frequency;

  const times = [];

  for (let i = 0; i < frequency; i++) {
    // Calculate the start and end of this segment
    const segmentStart = i * segmentSize;
    const segmentEnd = (i + 1) * segmentSize;

    // Add some buffer to avoid notifications too close to segment edges
    const buffer = Math.min(10, segmentSize * 0.1); // 10 min or 10% of segment
    const randomMinute =
      segmentStart + buffer + Math.random() * (segmentEnd - segmentStart - 2 * buffer);

    // Convert to hour and minute
    const totalMinutes = Math.floor(randomMinute);
    const hour = wakeHour + Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    times.push({ hour, minute });
  }

  // Sort times chronologically
  times.sort((a, b) => {
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.minute - b.minute;
  });

  // Ensure minimum gap between consecutive notifications
  for (let i = 1; i < times.length; i++) {
    const prevTime = times[i - 1];
    const currentTime = times[i];

    const prevTotalMinutes = prevTime.hour * 60 + prevTime.minute;
    const currentTotalMinutes = currentTime.hour * 60 + currentTime.minute;
    const gap = currentTotalMinutes - prevTotalMinutes;

    if (gap < minGapMinutes) {
      // Adjust current time to maintain minimum gap
      const adjustedTotalMinutes = prevTotalMinutes + minGapMinutes;
      currentTime.hour = Math.floor(adjustedTotalMinutes / 60);
      currentTime.minute = adjustedTotalMinutes % 60;

      // Make sure we don't exceed sleep hour
      if (currentTime.hour >= sleepHour) {
        currentTime.hour = sleepHour - 1;
        currentTime.minute = 59;
      }
    }
  }

  // Log the final scheduled times in readable format
  console.log(`✅ Generated ${times.length} notification times:`);
  times.forEach((time, index) => {
    const period = time.hour >= 12 ? 'PM' : 'AM';
    const displayHour = time.hour > 12 ? time.hour - 12 : (time.hour === 0 ? 12 : time.hour);
    const displayMinute = time.minute.toString().padStart(2, '0');
    console.log(`   ${index + 1}. ${displayHour}:${displayMinute} ${period}`);
  });

  return times;
};

/**
 * Get a random notification message
 * @returns {string} Random notification message
 */
export const getRandomNotificationMessage = () => {
  const messages = CONFIG.notificationMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

/**
 * Calculate trigger date from time
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {Date} Trigger date
 */
export const calculateTriggerDate = (hour, minute) => {
  const trigger = new Date();
  trigger.setHours(hour);
  trigger.setMinutes(minute);
  trigger.setSeconds(0);
  trigger.setMilliseconds(0);

  // If the time has already passed today, schedule for tomorrow
  const now = new Date();
  if (trigger <= now) {
    trigger.setDate(trigger.getDate() + 1);
  }

  return trigger;
};

/**
 * Check if it's time to regenerate notifications (new day)
 * @param {string} lastScheduleDate - ISO date string of last schedule
 * @returns {boolean} True if should regenerate
 */
export const shouldRegenerateNotifications = (lastScheduleDate) => {
  if (!lastScheduleDate) return true;

  const lastSchedule = new Date(lastScheduleDate);
  const now = new Date();

  // Check if it's a new day
  return (
    lastSchedule.getDate() !== now.getDate() ||
    lastSchedule.getMonth() !== now.getMonth() ||
    lastSchedule.getFullYear() !== now.getFullYear()
  );
};

/**
 * Get next notification time
 * @param {Array} times - Array of {hour, minute} objects
 * @returns {Object|null} Next notification time or null if all passed
 */
export const getNextNotificationTime = (times) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const time of times) {
    const timeMinutes = time.hour * 60 + time.minute;
    if (timeMinutes > currentMinutes) {
      return time;
    }
  }

  return null; // All notifications for today have passed
};

/**
 * Format time for display
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {string} Formatted time (e.g., "9:30 AM")
 */
export const formatTimeDisplay = (hour, minute) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
};

export default {
  generateRandomTimes,
  getRandomNotificationMessage,
  calculateTriggerDate,
  shouldRegenerateNotifications,
  getNextNotificationTime,
  formatTimeDisplay,
};
