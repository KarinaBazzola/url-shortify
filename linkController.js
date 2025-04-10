// backend/controllers/linkController.js
const Link = require('../models/Link');
const crypto = require('crypto');

const createShortLink = async (req, res) => {
  try {
    const { originalUrl, customSlug } = req.body;
    const slug = customSlug || crypto.randomBytes(6).toString('hex');
    const shortUrl = `${process.env.BASE_URL}/${slug}`;

    const newLink = await Link.create({
      originalUrl,
      shortUrl,
      slug,
    });

    res.status(201).json({ shortUrl: newLink.shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getLink = async (req, res) => {
  try {
    const { slug } = req.params;
    const link = await Link.findOne({ where: { slug } });

    if (!link) {
      return res.status(404).send('Link not found');
    }

    link.clicks += 1;
    await link.save();

    res.redirect(link.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { createShortLink, getLink };
