const express = require('express');
const cors = require('cors');  // CORS modülünü dahil et
const app = express();

// CORS'u aktif et
app.use(cors());

// Veritabanı bağlantısı ve veri çekme kodları
const { connect, getData } = require('./database');  // database.js'yi dahil et

// API endpoint
app.get('/veriler', async (req, res) => {
    try {
        await connect();  // Veritabanına bağlan
        const data = await getData();  // Verileri al
        res.json(data);  // JSON formatında verileri gönder
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        res.status(500).json({ error: 'Veri çekme sırasında hata oluştu' });
    }
});

// Ana sayfa endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
