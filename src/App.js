import React, { useState } from 'react';
import CryptoList from './components/CryptoList';
import AddCryptoForm from './components/AddCryptoForm';
import EditCryptoForm from './components/EditCryptoForm';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [cryptos, setCryptos] = useLocalStorage('cryptos', [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000 },
  ]);
  const [editingCrypto, setEditingCrypto] = useState(null);

  const handleAddCrypto = (newCrypto) => {
    setCryptos([...cryptos, { ...newCrypto, id: Date.now(), price: 0 }]);
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
      {editingCrypto ? (
        <EditCryptoForm
          crypto={editingCrypto}
          onSave={handleSaveEdit}
          onCancel={() => setEditingCrypto(null)}
        />
      ) : (
        <>
          <CryptoList
            cryptos={cryptos}
            onDelete={handleDeleteCrypto}
            onEdit={handleEditCrypto}
          />
          <AddCryptoForm onAddCrypto={handleAddCrypto} />
        </>
      )}
    </div>
  );
}

export default App;
