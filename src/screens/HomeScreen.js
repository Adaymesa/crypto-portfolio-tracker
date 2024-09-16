import React from 'react';
import { Link } from 'react-router-dom';
import CryptoList from '../components/CryptoList';

function HomeScreen({ cryptos, onDelete }) {
    return (
      <div>
        <h2>Your Cryptocurrencies</h2>
        <CryptoList cryptos={cryptos} onDelete={onDelete} />
        <Link to="/add">Add New Cryptocurrency</Link>
      </div>
    );
}

export default HomeScreen;