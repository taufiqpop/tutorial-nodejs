const { rejects } = require("assert");
const { resolve } = require("path");
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat File contacts.json Jika Belum Ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Variable Load Contact
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// Save Contact
const simpanContact = (nama, email, noHP) => {
  const contact = {
    nama,
    email,
    noHP,
  };
  const contacts = loadContact;

  // Cek Duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.bold("Contact Sudah Terdaftar, Gunakan Nama Lain!"));
    return false;
  }

  // Cek Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold("Email Tidak Valid!"));
      return false;
    }
  }

  // Cek No HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.bold("Nomor HP Tidak Valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.bold("Terima Kasih Sudah Memasukkan Data!"));
};

// List Contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.bold("Daftar Contacts :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

// Detail Contact
const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.bold(`${nama} Tidak Ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

// Delete Contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.bold(`${nama} Tidak Ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.bold(`Data Contact ${nama} Berhasil Dihapus!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
