const express = require("express");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const {
  loadContact,
  findContact,
  addContact,
  updateContact,
  cekDuplikat,
  deleteContact,
} = require("./utils/contacts");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Gunakan EJS
app.set("view engine", "ejs");

// Built-in Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
app.get("/", (req, res) => {
  res.render("index", { nama: "Pop", title: "Contact App" });
});

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About" });
});

// Halaman List Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// Form Add Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", { title: "Form Add Contact" });
});

// Proses Tambah Data Contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid!").isEmail(),
    check("nohp", "No HP Tidak Valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // Kirimkan Flash Message
      req.flash("msg", "Data Contact Berhasil Ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// Form Edit Data Contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("edit-contact", { title: "Form Edit Contact", contact });
});

// Proses Update Data Contact
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Digunakan!");
      }
      return true;
    }),
    check("email", "Email Tidak Valid!").isEmail(),
    check("nohp", "No HP Tidak Valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Edit Data Contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body);
      // Kirimkan Flash Message
      req.flash("msg", "Data Contact Berhasil Diubah!");
      res.redirect("/contact");
    }
  }
);

// Proses Delete Contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // Jika Contact Tidak Ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    // Kirimkan Flash Message
    req.flash("msg", "Data Contact Berhasil Dihapus!");
    res.redirect("/contact");
  }
});

// Detail Contact
app.get("/contact/:nama", async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", { title: "Detail Contact", contact });
});

// 404
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

// Port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
