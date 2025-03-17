import React, { useState, useEffect } from "react";

function VeriListesi() {
    const [veriler, setVeriler] = useState([]);

    useEffect(() => {
        async function getVeriler() {
            try {
                const response = await fetch("http://localhost:3000/veriler");
                if (!response.ok) throw new Error("Veri çekme hatası!");

                const data = await response.json();
                console.log("Gelen veriler:", data); // Konsola yazdır
                setVeriler(data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        }

        getVeriler();
    }, []);

    return (
        <div>
            <h1>Node.js API'den Veri Çekme</h1>
            <ul>
                {veriler.length === 0 ? (
                    <p>Yükleniyor...</p>
                ) : (
                    veriler.map((item, index) => (
                        <li key={index}>
                            <strong>SalesOrderID:</strong> {item.SalesOrderID} <br />
                            <strong>Order Date:</strong> {new Date(item.OrderDate).toLocaleDateString()} <br />
                            <strong>Due Date:</strong> {new Date(item.DueDate).toLocaleDateString()} <br />
                            <strong>Ship Date:</strong> {new Date(item.ShipDate).toLocaleDateString()} <br />
                            <strong>Status:</strong> {item.Status} <br />
                            <strong>Customer ID:</strong> {item.CustomerID} <br />
                            <strong>Ship Method:</strong> {item.ShipMethod} <br />
                            <strong>Total Due:</strong> {item.TotalDue} <br />
                            <hr />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default VeriListesi;
