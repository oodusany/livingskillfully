/**
 * Emotion Log Screen
 * 3-layer emotion selection flow
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';
import { EMOTIONS_DATA } from '../data/emotionsData';
import { useApp } from '../context/AppContext';
import ProgressIndicator from '../components/ProgressIndicator';

const EmotionLogScreen = ({ navigation }) => {
  const [layer, setLayer] = useState(1);
  const [selectedCore, setSelectedCore] = useState(null);
  const [selectedSecondary, setSelectedSecondary] = useState(null);
  const [selectedNuanced, setSelectedNuanced] = useState(null);
  const { saveEmotionLog } = useApp();

  const handleCoreSelection = (emotion) => {
    setSelectedCore(emotion);
    setLayer(2);
  };

  const handleSecondarySelection = (secondary) => {
    setSelectedSecondary(secondary);
    setLayer(3);
  };

  const handleNuancedSelection = async (nuanced) => {
    setSelectedNuanced(nuanced);

    // Save emotion log to storage
    await saveEmotionLog({
      coreEmotion: selectedCore.id,
      coreEmotionLabel: selectedCore.label,
      secondaryEmotion: selectedSecondary.id,
      secondaryEmotionLabel: selectedSecondary.label,
      nuancedEmotion: nuanced.id,
      nuancedEmotionLabel: nuanced.label,
      timestamp: new Date().toISOString(),
    });

    navigation.navigate('Noted');
  };

  const handleBack = () => {
    if (layer > 1) {
      setLayer(layer - 1);
      if (layer === 2) setSelectedCore(null);
      if (layer === 3) setSelectedSecondary(null);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <ProgressIndicator currentStep={layer} totalSteps={3} />
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.question}>
          {layer === 1 && "What's the core feeling?"}
          {layer === 2 && "Which aspect?"}
          {layer === 3 && "More specifically?"}
        </Text>

        {layer === 1 && (
          <View style={styles.emotionGrid}>
            {EMOTIONS_DATA.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                style={[styles.emotionCard, { backgroundColor: emotion.color }]}
                onPress={() => handleCoreSelection(emotion)}
              >
                <Text style={styles.emotionLabel}>{emotion.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {layer === 2 && selectedCore && (
          <View style={styles.emotionList}>
            {selectedCore.secondary.map((secondary) => (
              <TouchableOpacity
                key={secondary.id}
                style={styles.listItem}
                onPress={() => handleSecondarySelection(secondary)}
              >
                <Text style={styles.listItemText}>{secondary.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {layer === 3 && selectedSecondary && (
          <View style={styles.emotionList}>
            {selectedSecondary.nuances.map((nuanced) => (
              <TouchableOpacity
                key={nuanced.id}
                style={styles.listItem}
                onPress={() => handleNuancedSelection(nuanced)}
              >
                <Text style={styles.listItemText}>{nuanced.label}</Text>
                <Text style={styles.listItemDef}>{nuanced.def}</Text>
              </TouchableOpacity>
            ))}
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
  content: {
    flex: 1,
    padding: 24,
  },
  question: {
    fontSize: 24,
    color: COLORS.forest,
    marginBottom: 24,
    fontWeight: '300',
  },
  emotionGrid: {
    gap: 16,
  },
  emotionCard: {
    padding: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  emotionLabel: {
    fontSize: 28,
    color: COLORS.forest,
    fontWeight: '500',
  },
  emotionList: {
    gap: 12,
  },
  listItem: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  listItemText: {
    fontSize: 20,
    color: COLORS.forest,
    fontWeight: '500',
    marginBottom: 4,
  },
  listItemDef: {
    fontSize: 14,
    color: COLORS.ash,
    fontWeight: '300',
  },
});

export default EmotionLogScreen;
