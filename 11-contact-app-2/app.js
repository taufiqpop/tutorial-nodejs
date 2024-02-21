const yargs = require("yargs");
const contacts = require("./contacts");
yargs.command({
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
});
yargs.parse();
