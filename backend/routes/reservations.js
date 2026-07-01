const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

// GET all reservations for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.userId })
      .populate('listing', 'title location price images');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations', error: err.message });
  }
});

// GET a single reservation
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('listing', 'title location price images');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservation', error: err.message });
  }
});

// POST create a reservation
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { listing, checkIn, checkOut, guests, totalPrice } = req.body;
    const newReservation = new Reservation({
      listing,
      user: req.userId, // comes from the JWT via authMiddleware
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: 'Error creating reservation', error: err.message });
  }
});

// DELETE a reservation
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    if (reservation.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this reservation' });
    }
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting reservation', error: err.message });
  }
});

module.exports = router;