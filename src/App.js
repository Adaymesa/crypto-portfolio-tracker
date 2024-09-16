import React, { useState, useEffect, useCallback } from 'react';
import CryptoList from './components/CryptoList';
import AddCryptoForm from './components/AddCryptoForm';
import EditCryptoForm from './components/EditCryptoForm';
import useLocalStorage from './hooks/useLocalStorage';
import { fetchCryptoPrices, fetchCoinsList } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useLocalStorage('cryptos', [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', quantity: 1 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', quantity: 10 },
  ]);
  const [prices, setPrices] = useState({});
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCrypto, setEditingCrypto] = useState(null);

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

  const findCoinInfo = useCallback((cryptoName) => {
    return coinsList.find(coin => coin.name.toLowerCase() === cryptoName.toLowerCase());
  }, [coinsList]);

  const mapCryptosToCorrectIds = useCallback((cryptos) => {
    return cryptos.map(crypto => {
      const coinInfo = findCoinInfo(crypto.name);
      return coinInfo ? { ...crypto, id: coinInfo.id } : crypto;
    });
  }, [findCoinInfo]);

  const updatePrices = useCallback(async () => {
    if (cryptos.length === 0 || coinsList.length === 0) return;
    try {
      setLoading(true);
      const cryptosWithCorrectIds = mapCryptosToCorrectIds(cryptos);
      const newPrices = await fetchCryptoPrices(cryptosWithCorrectIds);
      setPrices(newPrices);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setError('Failed to fetch crypto prices. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [cryptos, coinsList, mapCryptosToCorrectIds]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    if (coinsList.length > 0) {
      updatePrices();
    }
  }, [coinsList, updatePrices]);

  const handleAddCrypto = (newCrypto) => {
    const coinInfo = findCoinInfo(newCrypto.name);
    if (coinInfo) {
      setCryptos(prevCryptos => [...prevCryptos, { ...newCrypto, id: coinInfo.id }]);
    } else {
      setError(`Couldn't find ${newCrypto.name} in the CoinGecko list.`);
    }
  };

  const handleDeleteCrypto = (id) => {
    setCryptos(prevCryptos => prevCryptos.filter(crypto => crypto.id !== id));
  };

  const handleEditCrypto = (crypto) => {
    setEditingCrypto(crypto);
  };

  const handleSaveEdit = (editedCrypto) => {
    setCryptos(prevCryptos => prevCryptos.map(crypto => 
      crypto.id === editedCrypto.id ? editedCrypto : crypto
    ));
    setEditingCrypto(null);
  };

  const handleCancelEdit = () => {
    setEditingCrypto(null);
  };

  const cryptosWithPrices = cryptos.map(crypto => ({
    ...crypto,
    price: prices[crypto.id]?.usd || 0
  }));

  return (
    <div className="App">
      <h1>Crypto Portfolio</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button onClick={updatePrices} disabled={loading}>Refresh Prices</button>
      {editingCrypto ? (
        <EditCryptoForm
          crypto={editingCrypto}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <CryptoList
            cryptos={cryptosWithPrices}
            onDelete={handleDeleteCrypto}
            onEdit={handleEditCrypto}
          />
          <AddCryptoForm onAddCrypto={handleAddCrypto} coinsList={coinsList} />
        </>
      )}
    </div>
  );
}

export default App;
