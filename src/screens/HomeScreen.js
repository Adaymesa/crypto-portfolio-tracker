import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import { deleteCrypto, fetchPrices } from '../app/cryptoSlice';
import { debounce } from 'lodash';

function HomeScreen() {
    const cryptos = useSelector(state => state.crypto.cryptos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const debouncedFetch = useCallback(
        debounce((ids) => {
            dispatch(fetchPrices(ids));
        }, 300),
        [dispatch]
    );

    useEffect(() => {
        if (cryptos.length > 0) {
            const debouncedFetch = debounce(() => {
                dispatch(fetchPrices(cryptos.map(crypto => crypto.id)));
            }, 500);
            debouncedFetch();
            return () => debouncedFetch.cancel;
        }
    }, [dispatch, cryptos]);

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