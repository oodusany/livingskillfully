/**
 * Date Helper Utilities
 * Functions for date formatting and manipulation
 */

import { format, startOfMonth, endOfMonth, getDaysInMonth } from 'date-fns';

/**
 * Format date as "Month Day, Year"
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date
 */
export const formatLongDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
};

/**
 * Format date as "MMM DD"
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted date
 */
export const formatShortDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd');
};

/**
 * Format time as "h:mm a"
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted time
 */
export const formatTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
};

/**
 * Format month and year
 * @param {Date|string} date - Date object or ISO string
 * @returns {string} Formatted month and year (e.g., "January 2026")
 */
export const formatMonthYear = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMMM yyyy');
};

/**
 * Get month name
 * @param {number} month - Month (0-11)
 * @returns {string} Month name
 */
export const getMonthName = (month) => {
  const date = new Date(2000, month, 1);
  return format(date, 'MMMM');
};

/**
 * Get day name abbreviation
 * @param {number} day - Day of week (0-6, 0 = Sunday)
 * @returns {string} Day abbreviation
 */
export const getDayAbbreviation = (day) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day];
};

/**
 * Check if date is today
 * @param {Date|string} date - Date object or ISO string
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Get start of month
 * @param {Date} date - Date object
 * @returns {Date} Start of month
 */
export const getStartOfMonth = (date) => {
  return startOfMonth(date);
};

/**
 * Get end of month
 * @param {Date} date - Date object
 * @returns {Date} End of month
 */
export const getEndOfMonth = (date) => {
  return endOfMonth(date);
};

/**
 * Get number of days in month
 * @param {Date} date - Date object
 * @returns {number} Number of days
 */
export const getDaysInMonthCount = (date) => {
  return getDaysInMonth(date);
};

/**
 * Get current month and year
 * @returns {Object} Object with month (0-11) and year
 */
export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear(),
  };
};

/**
 * Get greeting based on time of day
 * @returns {string} Greeting text
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export default {
  formatLongDate,
  formatShortDate,
  formatTime,
  formatMonthYear,
  getMonthName,
  getDayAbbreviation,
  isToday,
  getStartOfMonth,
  getEndOfMonth,
  getDaysInMonthCount,
  getCurrentMonthYear,
  getTimeBasedGreeting,
};
