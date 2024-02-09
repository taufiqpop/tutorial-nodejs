// Penjelasan Module System

// const fs = require('fs'); // Core Module
// const cetakNama = require('./coba'); // Local Module
// const moment = require('moment'); // Third Party Module / NPM Module / node_modules

const coba = require('./coba');

console.log(
    coba.cetakNama('Taufiq Pop'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(), 
    new coba.Orang
);