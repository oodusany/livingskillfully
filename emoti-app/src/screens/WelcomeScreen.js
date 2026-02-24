/**
 * Welcome Screen
 * Displays a random mindfulness quote
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { getRandomQuote } from '../constants/quotes';

const WelcomeScreen = ({ navigation }) => {
  const quote = getRandomQuote();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.quoteText}>"{quote.text}"</Text>
        <Text style={styles.authorText}>— {quote.author}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OnboardingName')}
      >
        <Text style={styles.buttonText}>Begin</Text>
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
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 24,
    color: COLORS.forest,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '300',
  },
  authorText: {
    fontSize: 16,
    color: COLORS.ash,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.forest,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
