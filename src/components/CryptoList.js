import React from 'react';

const CryptoList = ({ cryptos = [] }) => {
  return (
    <div>
      <h1>Crypto Portfolio</h1>
      {cryptos.length > 0 ? (
        <ul>
          {cryptos.map(crypto => (
            <li key={crypto.id}>
              {crypto.name} ({crypto.symbol})
              <p>Quantity: {crypto.quantity}</p>
              <p>Price: ${crypto.price}</p>
              <p>Total Value: ${crypto.quantity * crypto.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cryptocurrencies in the portfolio.</p>
      )}
    </div>
  );
};

export default CryptoList;
