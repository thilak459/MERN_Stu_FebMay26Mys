// This file creates and export a custom EventEmitter instance
const EventEmitter = require("events");

// Custom EventEmitter object
const bookingEmitter = new EventEmitter();

module.exports = bookingEmitter;