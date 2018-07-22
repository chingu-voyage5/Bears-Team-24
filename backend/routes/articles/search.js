const Article = require('../../models/article');

async function search(req, res) {
  const { match_case: matchCase, q } = req.query;

  const options = typeof matchCase === 'string' ? '' : 'i';
  const searchParams = { $regex: `${q}`, $options: options };

  try {
    const results = await Article.find({
      content: { ...searchParams },
    })
      .populate('creator', 'username')
      .populate('topic')
      .populate('sub_topic');

    res.json(results);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error during search', e);
    res.json({ error: 'Search error' });
  }
}

module.exports = search;
