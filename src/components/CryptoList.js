import React from 'react';

function CryptoList({ cryptos, onDelete, onEdit }) {
  if (cryptos.length === 0) {
    return <p>No cryptocurrencies in your portfolio.</p>;
  }

  return (
    <ul>
      {cryptos.map((crypto) => (
        <li key={crypto.id}>
          {crypto.name} ({crypto.symbol})
          <p>Quantity: {crypto.quantity}</p>
          <p>Price: ${crypto.price}</p>
          <p>Total: ${(crypto.quantity * crypto.price).toFixed(2)}</p>
          <button onClick={() => onEdit(crypto.id)}>Edit</button>
          <button onClick={() => onDelete(crypto.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default CryptoList;
