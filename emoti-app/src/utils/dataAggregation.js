/**
 * Data Aggregation Utilities
 * Functions for processing and aggregating emotion logs for monthly summaries
 */

/**
 * Get logs for a specific month
 * @param {Array} logs - All emotion logs
 * @param {number} year - Year (e.g., 2026)
 * @param {number} month - Month (0-11, JavaScript Date format)
 * @returns {Array} Filtered logs for the specified month
 */
export const getLogsForMonth = (logs, year, month) => {
  if (!logs || !Array.isArray(logs)) return [];

  return logs.filter((log) => {
    const logDate = new Date(log.timestamp);
    return logDate.getFullYear() === year && logDate.getMonth() === month;
  });
};

/**
 * Get log counts by day for calendar heatmap
 * @param {Array} logs - Emotion logs for a specific month
 * @returns {Object} Object with day numbers as keys and counts as values
 */
export const getLogCountsByDay = (logs) => {
  if (!logs || !Array.isArray(logs)) return {};

  const countsByDay = {};

  logs.forEach((log) => {
    const logDate = new Date(log.timestamp);
    const day = logDate.getDate();

    if (countsByDay[day]) {
      countsByDay[day] += 1;
    } else {
      countsByDay[day] = 1;
    }
  });

  return countsByDay;
};

/**
 * Get top emotions with their frequencies
 * @param {Array} logs - Emotion logs
 * @param {number} limit - Maximum number of top emotions to return
 * @returns {Array} Array of objects with emotion and count
 */
export const getTopEmotions = (logs, limit = 5) => {
  if (!logs || !Array.isArray(logs)) return [];

  const emotionCounts = {};

  logs.forEach((log) => {
    const emotion = log.nuancedEmotionLabel || log.secondaryEmotionLabel || log.coreEmotionLabel;
    if (emotion) {
      if (emotionCounts[emotion]) {
        emotionCounts[emotion] += 1;
      } else {
        emotionCounts[emotion] = 1;
      }
    }
  });

  // Convert to array and sort by count
  const sortedEmotions = Object.entries(emotionCounts)
    .map(([emotion, count]) => ({ emotion, count }))
    .sort((a, b) => b.count - a.count);

  return sortedEmotions.slice(0, limit);
};

/**
 * Get total log count
 * @param {Array} logs - Emotion logs
 * @returns {number} Total number of logs
 */
export const getTotalLogCount = (logs) => {
  if (!logs || !Array.isArray(logs)) return 0;
  return logs.length;
};

/**
 * Get core emotion distribution
 * @param {Array} logs - Emotion logs
 * @returns {Object} Object with core emotion IDs as keys and counts as values
 */
export const getCoreEmotionDistribution = (logs) => {
  if (!logs || !Array.isArray(logs)) return {};

  const distribution = {};

  logs.forEach((log) => {
    const coreEmotion = log.coreEmotionLabel;
    if (coreEmotion) {
      if (distribution[coreEmotion]) {
        distribution[coreEmotion] += 1;
      } else {
        distribution[coreEmotion] = 1;
      }
    }
  });

  return distribution;
};

/**
 * Get intensity level for calendar heatmap coloring
 * @param {number} count - Number of logs for a day
 * @returns {string} Intensity level: 'none', 'low', 'medium', 'high'
 */
export const getIntensityLevel = (count) => {
  if (count === 0) return 'none';
  if (count === 1) return 'low';
  if (count <= 3) return 'medium';
  return 'high';
};

/**
 * Generate calendar grid data for a month
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {Object} countsByDay - Log counts by day
 * @returns {Array} Array of calendar grid objects
 */
export const generateCalendarGrid = (year, month, countsByDay) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday

  const grid = [];

  // Add empty cells for days before the 1st
  for (let i = 0; i < startDayOfWeek; i++) {
    grid.push({ day: null, count: 0, intensity: 'none' });
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const count = countsByDay[day] || 0;
    const intensity = getIntensityLevel(count);
    grid.push({ day, count, intensity });
  }

  return grid;
};

export default {
  getLogsForMonth,
  getLogCountsByDay,
  getTopEmotions,
  getTotalLogCount,
  getCoreEmotionDistribution,
  getIntensityLevel,
  generateCalendarGrid,
};
