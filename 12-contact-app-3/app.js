const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Contact Baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor HP",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan Daftar Semua Nama Contact
yargs.command({
  command: "list",
  describe: "Menampilkan Semua Nama & No HP Contact",
  handler() {
    contacts.listContact();
  },
});

// Menampilkan Detail Sebuah Contact
yargs.command({
  command: "detail",
  describe: "Menampilkan Detail Sebuah Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// Menghapus Contact Berdasarkan Nama
yargs.command({
  command: "delete",
  describe: "Menghapus Sebuah Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
