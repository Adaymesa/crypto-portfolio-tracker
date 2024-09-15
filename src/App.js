import React from 'react';
import CryptoList from './components/CryptoList';

function App() {
  const sampleCryptos = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', quantity: 1, price: 50000 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', quantity: 10, price: 3000 },
  ];

  return (
    <div className="App">
      <CryptoList cryptos={sampleCryptos} />
    </div>
  );
}

export default App;
