import generateRandomQuote from '../utils/generateRandomQuote.js';

const getRandomQuote = async (req, res) => {
  try {
    const randomQuote = await generateRandomQuote();
    return res.status(200).json(randomQuote);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch random quote' });
  }
}

export default getRandomQuote;