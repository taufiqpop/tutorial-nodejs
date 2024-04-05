const express = require("express");
const { loadContact, findContact, addContact } = require("./utils/contacts");
const app = express();
const port = 3000;

// Gunakan EJS
app.set("view engine", "ejs");

// Built-in Middleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index", { nama: "Pop", title: "Contact App" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", { title: "Halaman Contact", contacts });
});

// Add Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", { title: "Form Add Contact" });
});

// Proses Data Contact
app.post("/contact", (req, res) => {
  addContact(req.body);
  res.redirect("/contact");
});

// Detail Contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", { title: "Detail Contact", contact });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
