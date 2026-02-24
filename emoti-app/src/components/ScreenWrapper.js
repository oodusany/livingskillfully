/**
 * ScreenWrapper Component
 * Provides consistent layout and safe area handling for all screens
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';

const ScreenWrapper = ({
  children,
  backgroundColor = COLORS.linen,
  safeArea = true,
  keyboardAvoiding = false,
  style,
}) => {
  const content = (
    <View style={[styles.container, { backgroundColor }, style]}>
      {children}
    </View>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor }]}
      >
        {safeArea ? (
          <SafeAreaView style={styles.safeArea}>
            {content}
          </SafeAreaView>
        ) : content}
      </KeyboardAvoidingView>
    );
  }

  if (safeArea) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {content}
      </SafeAreaView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default ScreenWrapper;
