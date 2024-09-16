import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import { deleteCrypto } from '../app/cryptoSlice';

function HomeScreen() {
    const cryptos = useSelector(state => state.crypto.cryptos);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteCrypto(id));
    };

    return (
      <div>
        <h2>Your Cryptocurrencies</h2>
        <CryptoList cryptos={cryptos} onDelete={handleDelete} />
        <Link to="/add">Add New Cryptocurrency</Link>
      </div>
    );
}

export default HomeScreen;