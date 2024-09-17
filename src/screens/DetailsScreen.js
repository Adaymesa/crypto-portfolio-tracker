import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DetailsScreen.css';

function DetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cryptos = useSelector(state => state.crypto.cryptos);
  const crypto = cryptos.find(c => c.id === id);

  if (!crypto) {
    return (
      <div className="details-container">
        <h2>Cryptocurrency not found</h2>
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h2>{crypto.name} ({crypto.symbol.toUpperCase()}) Details</h2>
      <div className="details-info">
        <p><strong>Name:</strong> {crypto.name}</p>
        <p><strong>Symbol:</strong> {crypto.symbol.toUpperCase()}</p>
        <p><strong>Quantity:</strong> {crypto.quantity}</p>
        <p><strong>Price:</strong> ${crypto.price ? crypto.price.toFixed(2) : 'N/A'}</p>
        <p><strong>Total Value:</strong> ${crypto.total ? crypto.total.toFixed(2) : 'N/A'}</p>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default DetailsScreen;
