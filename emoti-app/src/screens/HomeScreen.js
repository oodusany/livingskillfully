/**
 * Home Screen
 * Main dashboard showing greeting and check-in button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useApp } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { userProfile, emotionLogs } = useApp();
  const userName = userProfile?.name || 'Friend';

  // Get current month's log count
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthLogCount = emotionLogs.filter((log) => {
    const logDate = new Date(log.timestamp);
    return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
  }).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>

        {monthLogCount > 0 && (
          <View style={styles.statsCard}>
            <Text style={styles.statsCount}>{monthLogCount}</Text>
            <Text style={styles.statsLabel}>observations this month</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.checkInButton}
          onPress={() => navigation.navigate('EmotionLog')}
        >
          <Text style={styles.checkInText}>Check In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.summaryButton}
          onPress={() => navigation.navigate('MonthSummary')}
        >
          <Text style={styles.summaryText}>View Monthly Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  settingsIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 36,
    color: COLORS.forest,
    fontWeight: '300',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: COLORS.ash,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    minWidth: 200,
  },
  statsCount: {
    fontSize: 40,
    color: COLORS.forest,
    fontWeight: '300',
  },
  statsLabel: {
    fontSize: 14,
    color: COLORS.ash,
    marginTop: 4,
  },
  checkInButton: {
    backgroundColor: COLORS.forest,
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
  },
  checkInText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  summaryButton: {
    paddingVertical: 12,
  },
  summaryText: {
    color: COLORS.forest,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
