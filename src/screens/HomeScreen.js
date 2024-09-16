import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import { deleteCrypto } from '../app/cryptoSlice';

function HomeScreen() {
    const cryptos = useSelector(state => state.crypto.cryptos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteCrypto(id));
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <h2>Your Cryptocurrencies</h2>
            <CryptoList 
                cryptos={cryptos} 
                onDelete={handleDelete} 
                onEdit={handleEdit}
            />
            <Link to="/add">Add New Cryptocurrency</Link>
        </div>
    );
}

export default HomeScreen;