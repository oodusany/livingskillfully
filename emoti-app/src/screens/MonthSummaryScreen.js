/**
 * Month Summary Screen
 * Displays monthly emotion logs with calendar visualization
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useApp } from '../context/AppContext';
import { formatMonthYear } from '../utils/dateHelpers';
import {
  getLogsForMonth,
  getLogCountsByDay,
  getTopEmotions,
  getTotalLogCount,
  generateCalendarGrid,
} from '../utils/dataAggregation';

const MonthSummaryScreen = ({ navigation }) => {
  const { emotionLogs } = useApp();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate summary data
  const monthLogs = useMemo(
    () => getLogsForMonth(emotionLogs, currentYear, currentMonth),
    [emotionLogs, currentYear, currentMonth]
  );

  const logCountsByDay = useMemo(
    () => getLogCountsByDay(monthLogs),
    [monthLogs]
  );

  const calendarGrid = useMemo(
    () => generateCalendarGrid(currentYear, currentMonth, logCountsByDay),
    [currentYear, currentMonth, logCountsByDay]
  );

  const topEmotions = useMemo(
    () => getTopEmotions(monthLogs, 5),
    [monthLogs]
  );

  const totalCount = getTotalLogCount(monthLogs);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low':
        return COLORS.linen;
      case 'medium':
        return COLORS.ash;
      case 'high':
        return COLORS.forest;
      default:
        return '#F9F8F6';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Monthly Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Month</Text>
          <Text style={styles.monthName}>
            {formatMonthYear(currentDate)}
          </Text>

          {/* Calendar Grid */}
          <View style={styles.calendar}>
            {/* Day headers */}
            <View style={styles.calendarRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <View key={index} style={styles.dayHeader}>
                  <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar grid - 6 rows of 7 days */}
            {Array.from({ length: Math.ceil(calendarGrid.length / 7) }).map((_, weekIndex) => (
              <View key={weekIndex} style={styles.calendarRow}>
                {calendarGrid.slice(weekIndex * 7, (weekIndex + 1) * 7).map((cell, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[
                      styles.calendarCell,
                      { backgroundColor: cell.day ? getIntensityColor(cell.intensity) : 'transparent' }
                    ]}
                  >
                    {cell.day && (
                      <Text style={[
                        styles.calendarDayText,
                        cell.intensity === 'high' && styles.calendarDayTextLight
                      ]}>
                        {cell.day}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {totalCount === 0 && (
            <Text style={styles.emptyText}>No check-ins yet this month</Text>
          )}
        </View>

        {topEmotions.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Emotions</Text>
            {topEmotions.map((item, index) => (
              <View key={index} style={styles.emotionRow}>
                <Text style={styles.emotionLabel}>{item.emotion}</Text>
                <View style={styles.emotionBarContainer}>
                  <View
                    style={[
                      styles.emotionBar,
                      { width: `${(item.count / totalCount) * 100}%` }
                    ]}
                  />
                  <Text style={styles.emotionCount}>{item.count}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Observations</Text>
          <Text style={styles.totalCount}>{totalCount}</Text>
          <Text style={styles.totalLabel}>
            {totalCount === 1 ? 'check-in this month' : 'check-ins this month'}
          </Text>
        </View>

        {totalCount > 0 && (
          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>Calendar Legend</Text>
            <View style={styles.legendRow}>
              <View style={[styles.legendBox, { backgroundColor: '#F9F8F6' }]} />
              <Text style={styles.legendText}>No check-ins</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendBox, { backgroundColor: COLORS.linen }]} />
              <Text style={styles.legendText}>1 check-in</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendBox, { backgroundColor: COLORS.ash }]} />
              <Text style={styles.legendText}>2-3 check-ins</Text>
            </View>
            <View style={styles.legendRow}>
              <View style={[styles.legendBox, { backgroundColor: COLORS.forest }]} />
              <Text style={styles.legendText}>4+ check-ins</Text>
            </View>
          </View>
        )}
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
  card: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    color: COLORS.ash,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  monthName: {
    fontSize: 24,
    color: COLORS.forest,
    fontWeight: '500',
    marginBottom: 16,
  },
  calendar: {
    marginTop: 8,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayHeader: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeaderText: {
    fontSize: 12,
    color: COLORS.ash,
    fontWeight: '500',
  },
  calendarCell: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    color: COLORS.forest,
    fontWeight: '400',
  },
  calendarDayTextLight: {
    color: COLORS.white,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.ash,
    textAlign: 'center',
    marginTop: 16,
  },
  emotionRow: {
    marginBottom: 16,
  },
  emotionLabel: {
    fontSize: 16,
    color: COLORS.forest,
    marginBottom: 8,
    fontWeight: '500',
  },
  emotionBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotionBar: {
    height: 8,
    backgroundColor: COLORS.ochre,
    borderRadius: 4,
    minWidth: 20,
  },
  emotionCount: {
    fontSize: 14,
    color: COLORS.ash,
    marginLeft: 8,
  },
  totalCount: {
    fontSize: 48,
    color: COLORS.forest,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.ash,
    textAlign: 'center',
  },
  legendCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  legendTitle: {
    fontSize: 14,
    color: COLORS.ash,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: COLORS.forest,
  },
});

export default MonthSummaryScreen;
