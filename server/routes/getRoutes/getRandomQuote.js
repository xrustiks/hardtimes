import generateRandomQuote from '../../helpers/generateRandomQuote.js';

const getRandomQuote = async (req, res) => {
  try {
   const randomQuote = await generateRandomQuote();
   // console.log('Fetched quote:', randomQuote);
   return res.status(200).json(randomQuote);
  } catch (error) {
   console.error('Error fetching random quote:', error);
   return res.status(500).json({ error: 'Failed to fetch random quote' });
  }
}

export default getRandomQuote;