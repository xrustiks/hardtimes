import getRandomQuote from "./getRandomQuote.js";

const testLauncher = async () => {
  try {
    await getRandomQuote();
  } catch (error) {
    console.error('Error testing getRandomQuote:', error);
  }
};

testLauncher();