/**
 * Emoti Color Palette
 * Brand colors for consistent theming across the app.
 */

export const COLORS = {
  // Primary brand colors
  forest: '#2E4A42',    // Deep green for primary elements
  ochre: '#C3A059',     // Golden accent color
  ash: '#B6B1A9',       // Neutral gray
  rose: '#B28B84',      // Muted rose for secondary elements
  linen: '#F4F0EB',     // Off-white background
  white: '#FFFFFF',     // Pure white

  // UI states
  text: {
    primary: '#2E4A42',
    secondary: '#B6B1A9',
    light: '#FFFFFF',
  },

  background: {
    primary: '#F4F0EB',
    card: '#FFFFFF',
    overlay: 'rgba(46, 74, 66, 0.8)',
  },

  button: {
    primary: '#2E4A42',
    secondary: '#C3A059',
    danger: '#D4A5A5',
    disabled: '#B6B1A9',
  },

  /**
   * Per-category color pairs used by the intensity cards.
   * muted:   pale pastel — card background at intensity 1
   * vibrant: deep saturated — card background at intensity 10
   * bubble:  solid color for the Phase 1 selection bubble
   * Feelings Wheel associations: Mad=Red, Sad=Blue, Scared=Purple,
   * Joyful=Yellow, Powerful=Orange, Peaceful=Green, Bad=Warm Gray
   */
  emotionCategories: {
    mad: {
      muted: '#F5C6C2',
      vibrant: '#8B1A10',
      bubble: '#D94F3D',
    },
    sad: {
      muted: '#C5D8E8',
      vibrant: '#1A3D5C',
      bubble: '#4A80B0',
    },
    scared: {
      muted: '#D8C8E8',
      vibrant: '#4A1D6B',
      bubble: '#8A5BB5',
    },
    joyful: {
      muted: '#FAE8A8',
      vibrant: '#7A5800',
      bubble: '#D4A30A',
    },
    powerful: {
      muted: '#FAD8B0',
      vibrant: '#7A2800',
      bubble: '#D4732A',
    },
    peaceful: {
      muted: '#B8E0D0',
      vibrant: '#1A5232',
      bubble: '#3A9E72',
    },
    bad: {
      muted: '#D8D5D0',
      vibrant: '#3D3530',
      bubble: '#7A7470',
    },
  },
};

export default COLORS;
