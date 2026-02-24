/**
 * ProgressIndicator Component
 * Shows 3-dot progress indicator for emotion logging layers
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 3 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            (index + 1) === currentStep && styles.dotActive,
            (index + 1) < currentStep && styles.dotCompleted,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ash,
  },
  dotActive: {
    backgroundColor: COLORS.forest,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotCompleted: {
    backgroundColor: COLORS.ochre,
  },
});

export default ProgressIndicator;
