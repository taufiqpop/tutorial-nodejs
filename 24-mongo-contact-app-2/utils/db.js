const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/popcast", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// TEST
// // Menambah 1 Data
// const contact1 = new Contact({
//   nama: "Pop",
//   nohp: "08128731711",
//   email: "pop@gmail.com",
// });

// // Simpan Ke Collection
// contact1.save().then((contact) => console.log(contact));
