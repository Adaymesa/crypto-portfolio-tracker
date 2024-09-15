import React, { useState } from 'react';
import CryptoList from './components/CryptoList';
import AddCryptoForm from './components/AddCryptoForm';

function App() {
  const [cryptos, setCryptos] = useState([
    { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000 },
  ]);

  const handleAddCrypto = (newCrypto) => {
    setCryptos([...cryptos, { ...newCrypto, id: Date.now(), price: 0 }]);
  };

  return (
    <div className="App">
      <CryptoList cryptos={cryptos} />
      <AddCryptoForm onAddCrypto={handleAddCrypto} />
    </div>
  );
}

export default App;
