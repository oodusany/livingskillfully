/**
 * Emoti - Emotional Awareness Practice
 * Main App Entry Point
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
