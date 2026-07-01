const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const authMiddleware = require('../middleware/authMiddleware');

// GET all listings — public, no login required
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings', error: err.message });
  }
});

// GET a single listing — public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listing', error: err.message });
  }
});

// POST create — PROTECTED, must be logged in
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(400).json({ message: 'Error creating listing', error: err.message });
  }
});

// PUT update — PROTECTED
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: 'Error updating listing', error: err.message });
  }
});

// DELETE — PROTECTED
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting listing', error: err.message });
  }
});

module.exports = router;