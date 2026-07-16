/**
 * Emotions Data Structure
 * Willcox vocabulary merged with Plutchik intensity logic.
 * 7 core categories, each with 3 intensity tiers (low/mid/high), 3 words per tier.
 */

export const EMOTIONS_DATA = [
  {
    id: 'mad',
    label: 'Mad',
    levels: {
      low: ['Skeptical', 'Annoyed', 'Irritated'],
      mid: ['Angry', 'Frustrated', 'Resentful'],
      high: ['Furious', 'Livid', 'Enraged'],
    },
  },
  {
    id: 'sad',
    label: 'Sad',
    levels: {
      low: ['Pensive', 'Disappointed', 'Bored'],
      mid: ['Sad', 'Lonely', 'Hurt'],
      high: ['Devastated', 'Heartbroken', 'Agonized'],
    },
  },
  {
    id: 'scared',
    label: 'Scared',
    levels: {
      low: ['Uneasy', 'Nervous', 'Worried'],
      mid: ['Afraid', 'Anxious', 'Threatened'],
      high: ['Terrified', 'Panicked', 'Overwhelmed'],
    },
  },
  {
    id: 'joyful',
    label: 'Joyful',
    levels: {
      low: ['Content', 'Amused', 'Satisfied'],
      mid: ['Happy', 'Cheerful', 'Proud'],
      high: ['Ecstatic', 'Jubilant', 'Euphoric'],
    },
  },
  {
    id: 'powerful',
    label: 'Powerful',
    levels: {
      low: ['Capable', 'Valued', 'Noticed'],
      mid: ['Strong', 'Confident', 'Important'],
      high: ['Invincible', 'Empowered', 'Heroic'],
    },
  },
  {
    id: 'peaceful',
    label: 'Peaceful',
    levels: {
      low: ['Calm', 'Quiet', 'Thoughtful'],
      mid: ['Serene', 'Secure', 'Relaxed'],
      high: ['Meditative', 'Blissful', 'Harmonious'],
    },
  },
  {
    id: 'bad',
    label: 'Bad',
    levels: {
      low: ['Tired', 'Stressed', 'Busy'],
      mid: ['Bored', 'Pressured', 'Apathetic'],
      high: ['Overwhelmed', 'Out of Control', 'Depleted'],
    },
  },
];

/**
 * Maps a slider intensity value (1-10) to the specific Willcox word for a category.
 * Tiers: low (1-3), mid (4-7), high (8-10) — each has 3 words.
 */
export const getWordForIntensity = (emotionId, intensity) => {
  const emotion = EMOTIONS_DATA.find((e) => e.id === emotionId);
  if (!emotion) return '';

  const i = Math.round(intensity);
  if (i <= 3) {
    return emotion.levels.low[i - 1];
  } else if (i <= 7) {
    // 4 positions mapped to 3 words: 4,5→[0], 6→[1], 7→[2]
    const idx = Math.min(2, Math.floor((i - 4) * 3 / 4));
    return emotion.levels.mid[idx];
  } else {
    return emotion.levels.high[i - 8];
  }
};

/**
 * Returns the intensity tier name for a given slider value.
 */
export const getTierForIntensity = (intensity) => {
  if (intensity <= 3) return 'low';
  if (intensity <= 7) return 'mid';
  return 'high';
};

export default EMOTIONS_DATA;
