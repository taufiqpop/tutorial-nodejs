// Core Module
// File System
const fs = require('fs');

// Menuliskan String Ke File (Synchronous)
// try {
//     fs.writeFileSync('test.txt', 'Hello World secara synchronous!')
// } catch (e) {
//     console.log(e);
// }

// Menuliskan String Ke File (Asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara asynchronous!', (err) => {
//     console.log(err);
// });

// Membaca Isi File (Sync)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// Membaca Isi File (Async)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Readline
const readline = require('readline');;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan Nama Anda : ', (nama) => {
    rl.question('Masukkan UID Genshin Anda : ', (UIDGenshin) =>{
        console.log(`Halo ${nama}, UID Genshin Anda : ${UIDGenshin}`);
        rl.close();
    })
});