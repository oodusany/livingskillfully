/**
 * Button Component
 * Reusable button with multiple variants
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';

const Button = ({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      case 'ghost':
        return styles.ghostButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'ghost':
        return styles.ghostText;
      case 'secondary':
      case 'danger':
      case 'primary':
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? COLORS.forest : COLORS.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButton: {
    backgroundColor: COLORS.forest,
  },
  secondaryButton: {
    backgroundColor: COLORS.ochre,
  },
  dangerButton: {
    backgroundColor: COLORS.rose,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  buttonDisabled: {
    backgroundColor: COLORS.ash,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  ghostText: {
    color: COLORS.forest,
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default Button;
