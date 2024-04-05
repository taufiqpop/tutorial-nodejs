const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

// Gunakan EJS
app.set("view engine", "ejs");

// Third Party Middleware
app.use(morgan("dev"));

// Built-in Middleware
app.use(express.static("public"));

// Application Level Middleware
app.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Pop",
      email: "pop@gmail.com",
    },
    {
      nama: "Lala",
      email: "lala@gmail.com",
    },
    {
      nama: "Ainun",
      email: "ainun@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Pop",
    title: "View Engine",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Halaman Contact" });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
