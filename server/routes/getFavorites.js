const getFavorites = async(req, res) => {
  try {
    return res.status(200).json({ message: `Your favorite quotes are all here` });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: `Failed retrieving favorites` });
  }
}

export default getFavorites;