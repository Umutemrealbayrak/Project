module.exports = {
    server: 'DESKTOP-EH7GV89\\SQLEXPRESS', // SQL Server Express instance adı
    database: 'AdventureWorksLT2022', // Veritabanı adı
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
      encrypt: false, // Şifrelemeyi açmak için true
      trustServerCertificate: true // Sertifika doğrulamasını devre dışı bırakmak için
    }
};
