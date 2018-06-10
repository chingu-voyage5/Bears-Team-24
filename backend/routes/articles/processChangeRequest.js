/* eslint-disable camelcase */
const processChangeRequest = async (req, res) => {
  const { accept, article_id } = req.body;

  console.log('@processChangeRequest accept, article_id:', accept, article_id);
  // res.json({ success: false, error: "some error message" })
  res.json({ success: true });
};

module.exports = processChangeRequest;
