/**
 * Mindfulness Quotes
 * Collection of quotes to display on welcome screen
 */

export const MINDFULNESS_QUOTES = [
  {
    text: "Smile, breathe and go slowly.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "You are the sky. Everything else—it's just the weather.",
    author: "Pema Chödrön"
  },
  {
    text: "The little things? The little moments? They aren't little.",
    author: "Jon Kabat-Zinn"
  },
  {
    text: "Wherever you are, be there totally.",
    author: "Eckhart Tolle"
  },
];

/**
 * Get a random quote from the collection
 * @returns {Object} Quote object with text and author
 */
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * MINDFULNESS_QUOTES.length);
  return MINDFULNESS_QUOTES[randomIndex];
};

export default MINDFULNESS_QUOTES;
