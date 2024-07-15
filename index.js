const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

let qrCode = null;

async function connectWhatsapp() {
  const auth = await useMultiFileAuthState("session");
  const socket = makeWASocket({
    printQRInTerminal: false, // Ubah menjadi false
    browser: ["DAPABOT", "", ""],
    auth: auth.state,
    logger: pino({ level: "silent" }),
  });

  socket.ev.on("creds.update", auth.saveCreds);
  socket.ev.on("connection.update", async ({ connection, qr }) => {
    if (connection === 'open') {
      console.log("WhatsApp Active..");
      qrCode = null; // Reset QR code ketika sudah terhubung
    } else if (connection === 'close') {
      console.log("WhatsApp Closed..");
      setTimeout(connectWhatsapp, 10000);
    } else if (connection === 'connecting') {
      console.log('WhatsApp Connecting');
    }
    if (qr && !qrCode) {
      console.log('New QR Code generated');
      qrCode = qr;
      fs.writeFileSync('qr.txt', qr);
    }
  });

  // ... (kode lainnya tetap sama)
}

connectWhatsapp();

module.exports = { connectWhatsapp, getQRCode: () => qrCode };