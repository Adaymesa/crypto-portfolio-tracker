import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default DetailsScreen;
