import React, { useState, useEffect, useCallback } from 'react';
import CryptoList from './components/CryptoList';
import AddCryptoForm from './components/AddCryptoForm';
import useLocalStorage from './hooks/useLocalStorage';
import { fetchCryptoPrices, fetchCoinsList } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useLocalStorage('cryptos', [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 0 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 0 },
  ]);
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCrypto, setEditingCrypto] = useState(null);
  const [pricesUpdated, setPricesUpdated] = useState(false);

  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      const coins = await fetchCoinsList();
      setCoinsList(coins);
    } catch (error) {
      console.error('Failed to fetch coins list:', error);
      setError('Failed to fetch coins list. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const updatePrices = useCallback(async () => {
    if (pricesUpdated) return; 
    try {
      const prices = await fetchCryptoPrices(cryptos.map(crypto => crypto.id));
      setCryptos(prevCryptos => 
        prevCryptos.map(crypto => ({
          ...crypto,
          price: prices[crypto.id]?.usd || 0
        }))
      );
      setPricesUpdated(true);
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  }, [cryptos, setCryptos, pricesUpdated]);

  useEffect(() => {
    updatePrices();
  }, [updatePrices]);

  const handleAddCrypto = (newCrypto) => {
    setCryptos([...cryptos, { ...newCrypto, id: newCrypto.name.toLowerCase(), price: 0 }]);
  };

  const handleDeleteCrypto = (id) => {
    setCryptos(cryptos.filter(crypto => crypto.id !== id));
  };

  const handleEditCrypto = (crypto) => {
    setEditingCrypto(crypto);
  };

  const handleSaveEdit = (editedCrypto) => {
    setCryptos(cryptos.map(crypto => crypto.id === editedCrypto.id ? editedCrypto : crypto));
    setEditingCrypto(null);
  };

  return (
    <div className="App">
      <h1>Crypto Portfolio</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <CryptoList
        cryptos={cryptos}
        onDelete={handleDeleteCrypto}
        onEdit={handleEditCrypto}
      />
      <AddCryptoForm onAddCrypto={handleAddCrypto} coinsList={coinsList} />
    </div>
  );
}

export default App;
