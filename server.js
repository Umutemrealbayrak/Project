const express = require('express');
const cors = require('cors');
const app = express();

// CORS'u belirli bir kaynağa izin verecek şekilde yapılandırıyoruz
app.use(cors({
  origin: 'http://localhost:3001',  // React uygulamasının adresi
}));

// Veritabanı bağlantısını tek bir kez kurup, global değişken olarak saklıyoruz
const { connect, getData } = require('./database');
let dbConnection = null;

// Veritabanı bağlantısını sağla (global connection kullanımı)
async function connectDatabase() {
    if (!dbConnection) {
        try {
            dbConnection = await connect();  // Veritabanına bağlan
            console.log('Veritabanına bağlantı sağlandı.');
        } catch (err) {
            console.error('Veritabanı bağlantısı sırasında hata oluştu:', err);
        }
    }
    return dbConnection;
}

// API endpoint
app.get('/veriler', async (req, res) => {
    try {
        await connectDatabase();  // Veritabanına bağlan
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
