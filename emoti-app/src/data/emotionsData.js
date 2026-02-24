/**
 * Emotions Data Structure
 * 3-layer emotion vocabulary for the feelings wheel
 * Based on Vipassana-inspired emotional awareness practice
 */

export const EMOTIONS_DATA = [
  {
    id: 'joy',
    label: 'Joy',
    color: '#E8D2A6',
    secondary: [
      {
        id: 'contentment',
        label: 'Contentment',
        nuances: [
          {
            id: 'peaceful',
            label: 'Peaceful',
            def: 'A state of calm and quiet serenity.'
          },
          {
            id: 'satisfied',
            label: 'Satisfied',
            def: 'Pleasure derived from fulfilled needs.'
          }
        ]
      },
      {
        id: 'excitement',
        label: 'Excitement',
        nuances: [
          {
            id: 'energetic',
            label: 'Energetic',
            def: 'Feeling a surge of vitality and spirit.'
          },
          {
            id: 'eager',
            label: 'Eager',
            def: 'A keen, expectant desire for what is coming.'
          }
        ]
      }
    ]
  },
  {
    id: 'sadness',
    label: 'Sadness',
    color: '#A3B7C1',
    secondary: [
      {
        id: 'loneliness',
        label: 'Loneliness',
        nuances: [
          {
            id: 'isolated',
            label: 'Isolated',
            def: 'Feeling physically or emotionally set apart.'
          },
          {
            id: 'abandoned',
            label: 'Abandoned',
            def: 'Feeling left behind or without support.'
          }
        ]
      },
      {
        id: 'despair',
        label: 'Despair',
        nuances: [
          {
            id: 'powerless',
            label: 'Powerless',
            def: 'Lacking the ability or influence to change things.'
          },
          {
            id: 'empty',
            label: 'Empty',
            def: 'A hollow sensation of lacking inner substance.'
          }
        ]
      }
    ]
  },
  {
    id: 'anger',
    label: 'Anger',
    color: '#D4A5A5',
    secondary: [
      {
        id: 'frustration',
        label: 'Frustration',
        nuances: [
          {
            id: 'annoyed',
            label: 'Annoyed',
            def: 'Slightly angry; a minor irritation.'
          },
          {
            id: 'thwarted',
            label: 'Thwarted',
            def: 'Anger from being prevented from a goal.'
          }
        ]
      },
      {
        id: 'resentment',
        label: 'Resentment',
        nuances: [
          {
            id: 'bitter',
            label: 'Bitter',
            def: 'Lingering anger from perceived unfairness.'
          },
          {
            id: 'indignant',
            label: 'Indignant',
            def: 'Anger sparked by perceived injustice.'
          }
        ]
      }
    ]
  },
  {
    id: 'fear',
    label: 'Fear',
    color: '#C9C4B9',
    secondary: [
      {
        id: 'anxiety',
        label: 'Anxiety',
        nuances: [
          {
            id: 'worried',
            label: 'Worried',
            def: 'Anxious about potential future problems.'
          },
          {
            id: 'overwhelmed',
            label: 'Overwhelmed',
            def: 'Feeling submerged by intensity or volume.'
          }
        ]
      },
      {
        id: 'threatened',
        label: 'Threatened',
        nuances: [
          {
            id: 'insecure',
            label: 'Insecure',
            def: 'Lacking confidence or feeling unsafe.'
          },
          {
            id: 'exposed',
            label: 'Exposed',
            def: 'Feeling vulnerable to harm or judgment.'
          }
        ]
      }
    ]
  }
];

/**
 * Get emotion by ID
 * @param {string} emotionId - The emotion ID
 * @returns {Object|undefined} Emotion object
 */
export const getEmotionById = (emotionId) => {
  return EMOTIONS_DATA.find(emotion => emotion.id === emotionId);
};

/**
 * Get secondary emotion by ID from a core emotion
 * @param {string} coreEmotionId - The core emotion ID
 * @param {string} secondaryEmotionId - The secondary emotion ID
 * @returns {Object|undefined} Secondary emotion object
 */
export const getSecondaryEmotion = (coreEmotionId, secondaryEmotionId) => {
  const coreEmotion = getEmotionById(coreEmotionId);
  if (!coreEmotion) return undefined;
  return coreEmotion.secondary.find(sec => sec.id === secondaryEmotionId);
};

/**
 * Get nuanced emotion by ID
 * @param {string} coreEmotionId - The core emotion ID
 * @param {string} secondaryEmotionId - The secondary emotion ID
 * @param {string} nuancedEmotionId - The nuanced emotion ID
 * @returns {Object|undefined} Nuanced emotion object
 */
export const getNuancedEmotion = (coreEmotionId, secondaryEmotionId, nuancedEmotionId) => {
  const secondaryEmotion = getSecondaryEmotion(coreEmotionId, secondaryEmotionId);
  if (!secondaryEmotion) return undefined;
  return secondaryEmotion.nuances.find(nuance => nuance.id === nuancedEmotionId);
};

export default EMOTIONS_DATA;
