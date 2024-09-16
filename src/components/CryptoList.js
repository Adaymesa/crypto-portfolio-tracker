import React from 'react';

function CryptoList({ cryptos, onDelete, onEdit }) {
  return (
    <div>
      <h2>Your Cryptocurrencies</h2>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol})
            <p>Quantity: {crypto.quantity}</p>
            <p>Price: ${crypto.price}</p>
            <p>Total: ${(crypto.quantity * crypto.price).toFixed(2)}</p>
            <button onClick={() => onEdit(crypto)}>Edit</button>
            <button onClick={() => onDelete(crypto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoList;
