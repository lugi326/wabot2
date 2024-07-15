const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { getQRCode } = require('./index');
const qrcode = require('qrcode');

// Fungsi untuk mendapatkan QR code string (sesuaikan dengan implementasi Anda)
function getQRCode() {
  // Implementasi Anda untuk mendapatkan QR code string
  // Contoh: return global.qr; // jika Anda menyimpan QR code di variabel global
}

app.get('/qr-image', async (req, res) => {
  const qr = getQRCode();
  if (qr) {
    try {
      const qrImage = await qrcode.toDataURL(qr);
      res.send(`<img src="${qrImage}" alt="QR Code">`);
    } catch (err) {
      console.error('Error generating QR code image:', err);
      res.status(500).send('Error generating QR code image');
    }
  } else {
    res.send('QR Code belum tersedia atau sudah terhubung ke WhatsApp');
  }
});

app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running!');
});

app.get('/qr', (req, res) => {
  const qr = getQRCode();
  if (qr) {
    res.send(`<pre>${qr}</pre>`);
  } else {
    res.send('QR Code belum tersedia atau sudah terhubung ke WhatsApp');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import dan jalankan bot WhatsApp Anda
require('./index');

