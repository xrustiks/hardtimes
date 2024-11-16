import generateRandomQuote from '../../helpers/generateRandomQuote.js';

const getRandomQuote = async (req, res) => {
  const { category } = req.query;

  try {
    const randomQuote = await generateRandomQuote(category);
    if (!randomQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    return res.status(200).json(randomQuote);
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return res.status(500).json({ error: 'Failed to fetch random quote' });
  }
}

export default getRandomQuote;