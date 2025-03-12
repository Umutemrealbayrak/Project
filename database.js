const sql = require('mssql/msnodesqlv8');
const config = require('./config'); // config dosyasını dahil ediyoruz

// Bağlantı fonksiyonu
async function connect() {
  try {
    await sql.connect(config); // Veritabanına bağlanıyoruz
    console.log('Veritabanına bağlantı başarılı!');
  } catch (err) {
    console.error('Veritabanı bağlantısı sırasında hata oluştu:', err);
  }
}

// Veri çekme fonksiyonu
async function getData() {
  try {
    const result = await sql.query('SELECT * FROM SalesLT.SalesOrderHeader'); // Örnek veri sorgusu
    return result.recordset; // Veriyi döndür
  } catch (err) {
    console.error('Veri çekme sırasında hata oluştu:', err);
    return null;
  }
}

// Bu fonksiyonları dışa aktarmayı unutma!
module.exports = { connect, getData };
