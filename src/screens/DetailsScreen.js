import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailsScreen() {
  const { id } = useParams();
  const cryptos = useSelector(state => state.crypto.cryptos);
  const crypto = cryptos.find(c => c.id === id);

  if (!crypto) {
    return <div>Cryptocurrency not found</div>;
  }

  return (
    <div>
      <h2>{crypto.name} ({crypto.symbol})</h2>
      <p>Quantity: {crypto.quantity}</p>
      <p>Price: ${crypto.price}</p>
      <p>Total Value: ${crypto.total}</p>
    </div>
  );
}

export default DetailsScreen;
