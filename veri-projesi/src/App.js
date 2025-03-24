import React, { useState, useEffect } from "react";

function App() {
    const [veriler, setVeriler] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all"); // 'all', 'id', 'totalDue'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verileri API'den alalım
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/veriler");
                if (!response.ok) {
                    throw new Error("Veri yüklenemedi");
                }
                const data = await response.json();
                setVeriler(data); 
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    
    // Seçilen filtreyi ayarlamak
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    // Veri filtreleme
    const filteredData = veriler.filter(item => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "id") return item.SalesOrderID; // ID'yi göstermek için
        if (selectedFilter === "totalDue") return item.TotalDue; // Total Due'yu göstermek için
        if(selectedFilter === "shipmethod") return item.ShipMethod; // ShipMethod'a göre filtreleme
        return false;
    });

    // ShipMethod'ları listelemek
    const shipMethods = Array.from(new Set(veriler.map(item => item.ShipMethod))); // Tekrar etmeyen ShipMethod'ları almak

    return (
        <div className="App">
            <div className="menu">
                <button onClick={() => handleFilterChange("all")}>Tümü</button>
                <button onClick={() => handleFilterChange("id")}>ID'yi Göster</button>
                <button onClick={() => handleFilterChange("totalDue")}>Total Due'yu Göster</button>
                <button onClick={() => handleFilterChange("shipmethod")}>Cargo Transport 5</button>
                {shipMethods.map((method, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilterChange(method)}
                    >
                        {method}
                    </button>
                ))}
            </div>

            <div className="veri-liste">
                <h2>Veriler</h2>
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <ul>
                        {filteredData.length === 0 ? (
                            <p>Veri bulunamadı.</p>
                        ) : (
                            filteredData.map((item) => (
                                <li key={item.SalesOrderID}>
                                    {selectedFilter === "all" ? (
                                        <>
                                            <div><strong>ID:</strong> {item.SalesOrderID}</div>
                                            <div><strong>Order Number:</strong> {item.SalesOrderNumber}</div>
                                            <div><strong>Ship Method:</strong> {item.ShipMethod}</div>
                                            <div><strong>Total Due:</strong> {item.TotalDue}</div>
                                        </>
                                    ) : selectedFilter === "id" ? (
                                        // Sadece ID gösterilecek
                                        <div><strong>ID:</strong> {item.SalesOrderID}</div>
                                    ) : selectedFilter === "totalDue" ? (
                                        // Sadece Total Due gösterilecek
                                        <div><strong>Total Due:</strong> {item.TotalDue}</div>
                                    ) :  selectedFilter === "shipmethod" ? (
                                        // ShipMethod'a göre filtreleme
                                        <div><strong>Ship Method:</strong> {item.ShipMethod}</div>
                                    ) : null}
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
