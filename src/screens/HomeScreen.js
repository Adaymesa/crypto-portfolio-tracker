import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import { deleteCrypto, fetchPrices } from '../app/cryptoSlice';
import './HomeScreen.css';

function HomeScreen() {
    const cryptos = useSelector(state => state.crypto.cryptos);
    const pricesFetched = useSelector(state => state.crypto.pricesFetched);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!pricesFetched && cryptos.length > 0) {
            const ids = cryptos.map(crypto => crypto.id);
            dispatch(fetchPrices(ids));
        }
    }, [cryptos, pricesFetched, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCrypto(id));
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="home-container">
            <Link to="/add" className="add-button">Add New Cryptocurrency</Link>
            <h2>Crypto Portfolio</h2>
            <CryptoList 
                cryptos={cryptos} 
                onDelete={handleDelete} 
                onEdit={handleEdit}
                onNavigate={(id) => navigate(`/edit/${id}`)}
            />
        </div>
    );
}

export default HomeScreen;