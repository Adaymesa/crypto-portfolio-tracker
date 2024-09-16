import React, { useState, useEffect, useCallback } from 'react';
import CryptoList from './components/CryptoList';
import AddCryptoForm from './components/AddCryptoForm';
import EditCryptoForm from './components/EditCryptoForm';
import useLocalStorage from './hooks/useLocalStorage';
import { fetchCryptoPrices, fetchCoinsList } from './services/cryptoService';

function App() {
  const [cryptos, setCryptos] = useLocalStorage('cryptos', []);
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCrypto, setEditingCrypto] = useState(null);

  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const coins = await fetchCoinsList();
      setCoinsList(coins);
    } catch (error) {
      console.error('Failed to fetch coins list:', error);
      setError('Failed to fetch coins list. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePrices = useCallback(async () => {
    console.log('cryptos', cryptos);
    console.log('coinsList', coinsList);
    if (!cryptos.length || !coinsList.length) return;
    try {
      setLoading(true);
      setError(null);

      const updatedCryptos = cryptos.map((crypto) => {
        const coinInfo = coinsList.find(
          (coin) => coin.name.toLowerCase() === crypto.name.toLowerCase()
        );
        return coinInfo ? { ...crypto, id: coinInfo.id } : crypto;
      });

      const newPrices = await fetchCryptoPrices(updatedCryptos);

      setCryptos(updatedCryptos.map((crypto) => ({
        ...crypto,
        price: newPrices[crypto.id]?.usd || crypto.price || 0,
      })));
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setError('Failed to fetch crypto prices. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [cryptos, coinsList]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    if (cryptos.length && coinsList.length) {
      updatePrices();
    }
  }, [coinsList]); 

  const handleAddCrypto = (newCrypto) => {
    const coinInfo = coinsList.find(
      (coin) => coin.name.toLowerCase() === newCrypto.name.toLowerCase()
    );
    if (coinInfo) {
      setCryptos((prevCryptos) => [
        ...prevCryptos,
        { ...newCrypto, id: coinInfo.id },
      ]);
    } else {
      setError(`Couldn't find ${newCrypto.name} in the CoinGecko list.`);
    }
  };

  const handleDeleteCrypto = (id) => {
    setCryptos((prevCryptos) => prevCryptos.filter((crypto) => crypto.id !== id));
  };

  const handleEditCrypto = (crypto) => {
    setEditingCrypto(crypto);
  };

  const handleSaveEdit = (editedCrypto) => {
    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) =>
        crypto.id === editedCrypto.id ? editedCrypto : crypto
      )
    );
    setEditingCrypto(null);
  };

  const handleCancelEdit = () => {
    setEditingCrypto(null);
  };

  return (
    <div className="App">
      <h1>Crypto Portfolio</h1>
      {error && (
        <p data-testid="error-message" style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {loading && <p>Loading...</p>}
      <button onClick={updatePrices} disabled={loading}>
        Refresh Prices
      </button>
      {editingCrypto ? (
        <EditCryptoForm
          crypto={editingCrypto}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <CryptoList
            cryptos={cryptos}
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