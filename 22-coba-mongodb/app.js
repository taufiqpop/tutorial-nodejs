const { mongoClient } = require("mongodb");
const MongoClient = require("mongodb/lib/mongo_client");
const uri = "mongodb://127.0.0.1:27017";
const dbName = "popcast";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal");
  }

  // Pilih Database
  const db = client.db(dbName);

  //   // Menambahkan 1 Data Ke Collection mahasiswa
    db.collection("mahasiswa").insertOne(
      {
        nama: "Syari",
        email: "syaridf@gmail.com",
      },
      (error, result) => {
        if (error) {
          return console.log("Gagal Menambahkan Data!");
        }
        console.log(result);
      }
    );

  // Menambahkan 1 Data Ke Collection mahasiswa
    db.collection("mahasiswa").insertMany(
      [
        {
          nama: "Syari",
          email: "syaridf@gmail.com",
        },
        {
          nama: "Maulidya",
          email: "uli@gmail.com",
        },
        {
          nama: "Ainunafi",
          email: "ainunafi@gmail.com",
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Gagal Menambahkan Data!");
        }
        console.log(result);
      }
    );

  //   Menampilkan Semua Data Yang Ada Di Collection
    console.log(
      db
        .collection("mahasiswa")
        .find()
        .toArray((error, result) => {
          console.log(result);
        })
    );

  Menampilkan Data Berdasarkan Kriteria
    console.log(
      db
        .collection("mahasiswa")
        .find({ nama: "Pop" })
        .toArray((error, result) => {
          console.log(result);
        })
    );

  // Mengubah Data Berdasarkan nama
    const updatePromise = db.collection("mahasiswa").updateOne(
      {
        nama: "Syari",
      },
      {
        $set: {
          nama: "Nisa",
        },
      }
    );

    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

  // Mengubah Data Lebih Dari 1, Berdasarkan Kriteria
    db.collection("mahasiswa").updateMany(
      {
        nama: "Nisa",
      },
      {
        $set: {
          nama: "Syari",
        },
      }
    );

  //   Menghapus 1 Data
  db.collection("mahasiswa")
    .deleteOne({
      nama: "Maulidya",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
