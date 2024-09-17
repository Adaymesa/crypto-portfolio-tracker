import React from 'react';
import { Link } from 'react-router-dom';
import './CryptoList.css';

const CryptoList = ({ cryptos, onDelete, onEdit }) => {
    if (cryptos.length === 0) {
        return <p>No cryptocurrencies in your portfolio.</p>;
    }

    return (
        <div className="crypto-list">
            {cryptos.map(crypto => (
                <div key={crypto.id} className="crypto-item">
                    <Link to={`/details/${crypto.id}`}>
                        <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                    </Link>
                    <p>Quantity: {crypto.quantity}</p>
                    <p>Price: ${crypto.price}</p>
                    <p>Total: ${(crypto.total).toFixed(2)}</p>
                    <div className="crypto-actions">
                        <button onClick={() => onEdit(crypto.id)}>Edit</button>
                        <button onClick={() => onDelete(crypto.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CryptoList;