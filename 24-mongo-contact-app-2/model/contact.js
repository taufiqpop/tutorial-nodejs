const mongoose = require("mongoose");

// Membuat Schema
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    require: true,
  },
  nohp: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;
