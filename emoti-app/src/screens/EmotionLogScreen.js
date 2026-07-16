/**
 * Emotion Log Screen — Volume-to-Vocabulary interaction
 *
 * Phase 1: Multi-select from 7 core category bubbles.
 * Phase 2: Per-emotion intensity cards with a 1-10 slider.
 *          The card background saturates and the word grows as volume rises.
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../constants/colors';
import { EMOTIONS_DATA, getWordForIntensity, getTierForIntensity } from '../data/emotionsData';
import { useApp } from '../context/AppContext';

// ---------------------------------------------------------------------------
// Colour helpers
// ---------------------------------------------------------------------------

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

/** Linear interpolation between two hex colours based on intensity 1–10. */
const interpolateColor = (mutedHex, vibrantHex, intensity) => {
  const t = (intensity - 1) / 9;
  const a = hexToRgb(mutedHex);
  const b = hexToRgb(vibrantHex);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
};

// ---------------------------------------------------------------------------
// Haptics helper
// ---------------------------------------------------------------------------

const triggerHaptic = async (prevValue, nextValue) => {
  try {
    const prevTier = getTierForIntensity(prevValue);
    const nextTier = getTierForIntensity(nextValue);

    if (prevTier !== nextTier) {
      // Double pulse on tier boundary crossing
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 130);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch (_) {
    // Haptics not available on this device — silent fail
  }
};

// ---------------------------------------------------------------------------
// IntensityCard
// ---------------------------------------------------------------------------

const IntensityCard = ({ category, intensity, onIntensityChange }) => {
  const word = getWordForIntensity(category.id, intensity);
  const catColors = COLORS.emotionCategories[category.id];
  const cardBg = interpolateColor(catColors.muted, catColors.vibrant, intensity);

  // Text transitions from dark to white as intensity rises
  const textColor = intensity >= 6 ? '#FFFFFF' : '#2E4A42';
  const subTextColor = intensity >= 6 ? 'rgba(255,255,255,0.7)' : 'rgba(46,74,66,0.5)';

  // Word grows and gains weight with intensity
  const wordSize = 24 + (intensity - 1) * 1.6;
  const wordWeight = intensity <= 3 ? '300' : intensity <= 7 ? '500' : '700';

  const trackColor =
    intensity >= 6 ? 'rgba(255,255,255,0.35)' : 'rgba(46,74,66,0.15)';
  const thumbColor = intensity >= 6 ? '#FFFFFF' : '#2E4A42';

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}>
      <Text style={[styles.cardCategory, { color: subTextColor }]}>
        {category.label.toUpperCase()}
      </Text>

      <Text
        style={[
          styles.cardWord,
          { color: textColor, fontSize: wordSize, fontWeight: wordWeight },
        ]}
      >
        {word}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={intensity}
        onValueChange={(val) => onIntensityChange(category.id, Math.round(val))}
        minimumTrackTintColor={thumbColor}
        maximumTrackTintColor={trackColor}
        thumbTintColor={thumbColor}
      />

      <View style={styles.sliderLabels}>
        <Text style={[styles.sliderLabel, { color: subTextColor }]}>quiet</Text>
        <Text style={[styles.sliderLabel, { color: subTextColor }]}>{intensity}</Text>
        <Text style={[styles.sliderLabel, { color: subTextColor }]}>loud</Text>
      </View>
    </View>
  );
};

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

const EmotionLogScreen = ({ navigation }) => {
  const [phase, setPhase] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [intensities, setIntensities] = useState({});
  const prevIntensities = useRef({});
  const { saveEmotionLog } = useApp();

  // Phase 1 — toggle bubble selection
  const toggleCategory = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // Advance to Phase 2 — initialise sliders at 5
  const goToIntensity = () => {
    const initial = {};
    selectedIds.forEach((id) => {
      initial[id] = 5;
    });
    setIntensities(initial);
    prevIntensities.current = { ...initial };
    setPhase(2);
  };

  // Slider change — haptic + state update
  const handleIntensityChange = useCallback(async (categoryId, nextValue) => {
    const prevValue = prevIntensities.current[categoryId] ?? 5;
    if (nextValue === prevValue) return;

    await triggerHaptic(prevValue, nextValue);
    prevIntensities.current[categoryId] = nextValue;
    setIntensities((prev) => ({ ...prev, [categoryId]: nextValue }));
  }, []);

  // Save — always available once at least one category is selected
  const handleSave = async () => {
    const emotions = selectedIds.map((id) => {
      const intensity = intensities[id] ?? 5;
      const category = EMOTIONS_DATA.find((e) => e.id === id);
      const word = getWordForIntensity(id, intensity);
      return { category: id, categoryLabel: category.label, word, intensity };
    });

    const primary = emotions[0];
    await saveEmotionLog({
      timestamp: new Date().toISOString(),
      emotions,
      // Backward-compat fields for MonthSummaryScreen
      coreEmotionLabel: primary?.categoryLabel,
      nuancedEmotionLabel: primary?.word,
    });

    navigation.navigate('Noted');
  };

  const handleBack = () => {
    if (phase === 2) {
      setPhase(1);
    } else {
      navigation.goBack();
    }
  };

  // Ordered list of selected category objects for Phase 2
  const selectedCategories = selectedIds
    .map((id) => EMOTIONS_DATA.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerPhase}>
          {phase === 1 ? 'What are you feeling?' : 'Set the volume'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* ── Phase 1 : bubble multi-select ── */}
      {phase === 1 && (
        <>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.bubblesContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.subHeading}>
              Select everything that's present — you can feel more than one thing.
            </Text>

            <View style={styles.bubblesGrid}>
              {EMOTIONS_DATA.map((emotion) => {
                const isSelected = selectedIds.includes(emotion.id);
                const catColor = COLORS.emotionCategories[emotion.id].bubble;
                return (
                  <TouchableOpacity
                    key={emotion.id}
                    style={[
                      styles.bubble,
                      { backgroundColor: isSelected ? catColor : COLORS.white },
                      isSelected && styles.bubbleSelected,
                    ]}
                    onPress={() => toggleCategory(emotion.id)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.bubbleLabel,
                        { color: isSelected ? '#FFFFFF' : COLORS.forest },
                      ]}
                    >
                      {emotion.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                selectedIds.length === 0 && styles.continueButtonDisabled,
              ]}
              onPress={goToIntensity}
              disabled={selectedIds.length === 0}
            >
              <Text style={styles.continueButtonText}>
                {selectedIds.length === 0
                  ? 'Select at least one'
                  : `Continue  →`}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ── Phase 2 : intensity sliders ── */}
      {phase === 2 && (
        <>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.subHeading}>
              Drag the slider to find the word that matches your inner volume.
            </Text>

            {selectedCategories.map((category) => (
              <IntensityCard
                key={category.id}
                category={category}
                intensity={intensities[category.id] ?? 5}
                onIntensityChange={handleIntensityChange}
              />
            ))}

            {/* Bottom padding so Save button doesn't obscure last card */}
            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save check-in</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.linen,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 12,
  },
  backButton: {
    fontSize: 28,
    color: COLORS.forest,
    width: 40,
  },
  headerPhase: {
    fontSize: 16,
    color: COLORS.forest,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  // Shared
  scrollArea: {
    flex: 1,
  },
  subHeading: {
    fontSize: 14,
    color: COLORS.ash,
    fontWeight: '300',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 24,
  },

  // Phase 1 — bubbles
  bubblesContainer: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  bubblesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  bubble: {
    width: '46%',
    paddingVertical: 28,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    // Subtle shadow for depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  bubbleSelected: {
    borderColor: 'rgba(255,255,255,0.5)',
  },
  bubbleLabel: {
    fontSize: 20,
    fontWeight: '500',
  },

  // Phase 2 — cards
  cardsContainer: {
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  cardWord: {
    marginBottom: 24,
    lineHeight: 44,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  sliderLabel: {
    fontSize: 12,
    fontWeight: '300',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    paddingTop: 12,
    backgroundColor: COLORS.linen,
  },
  continueButton: {
    backgroundColor: COLORS.forest,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.ash,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: COLORS.forest,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmotionLogScreen;
