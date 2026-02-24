/**
 * Noted Screen
 * Confirmation screen after logging an emotion
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { CONFIG } from '../constants/config';

const NotedScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, CONFIG.ui.notedDuration);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.checkmark}>✓</Text>
      <Text style={styles.message}>Noted.</Text>
      <Text style={styles.subtitle}>The sensation is seen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 64,
    color: COLORS.forest,
    marginBottom: 24,
  },
  message: {
    fontSize: 28,
    color: COLORS.forest,
    fontWeight: '300',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.ash,
  },
});

export default NotedScreen;
