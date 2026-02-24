/**
 * Onboarding Name Screen
 * Collects user's name during onboarding
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useApp } from '../context/AppContext';

const OnboardingNameScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const { saveUserProfile } = useApp();

  const handleContinue = async () => {
    if (name.trim()) {
      await saveUserProfile(name.trim());
      navigation.navigate('OnboardingFrequency', { name: name.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>What's your name?</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={COLORS.ash}
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !name.trim() && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!name.trim()}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 28,
    color: COLORS.forest,
    marginBottom: 24,
    fontWeight: '300',
  },
  input: {
    fontSize: 20,
    color: COLORS.forest,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.forest,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: COLORS.forest,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.ash,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingNameScreen;
