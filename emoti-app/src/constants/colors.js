/**
 * Emoti Color Palette
 * Brand colors for consistent theming across the app
 */

export const COLORS = {
  // Primary brand colors
  forest: '#2E4A42',    // Deep green for primary elements
  ochre: '#C3A059',     // Golden accent color
  ash: '#B6B1A9',       // Neutral gray
  rose: '#B28B84',      // Muted rose for secondary elements
  linen: '#F4F0EB',     // Off-white background
  white: '#FFFFFF',     // Pure white

  // Emotion-specific colors (for feelings wheel)
  joy: '#E8D2A6',       // Warm yellow-beige
  sadness: '#A3B7C1',   // Soft blue
  anger: '#D4A5A5',     // Muted red
  fear: '#C9C4B9',      // Warm gray

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
};

export default COLORS;
