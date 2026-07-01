const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  type: { type: String, required: true }, // e.g. "Entire home", "Private room"
  price: { type: Number, required: true },
  amenities: [{ type: String }], // an array of strings, e.g. ["WiFi", "Pool"]
  images: [{ type: String }], // an array of image URLs
  weeklyDiscount: { type: Number, default: 0 },
  cleaningFee: { type: Number, default: 0 },
  serviceFee: { type: Number, default: 0 },
  occupancyTaxes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);