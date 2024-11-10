const getAddQuotePage = async(req, res) => {
  return res.status(200).json({ message: "Add quote here" });
}

export default getAddQuotePage;