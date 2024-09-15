import React, { useState } from 'react';

const AddCryptoForm = ({ onAddCrypto }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCrypto({
      name,
      symbol,
      quantity: parseFloat(quantity)
    });
    setName('');
    setSymbol('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="symbol">Symbol:</label>
        <input
          id="symbol"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="0"
          step="any"
        />
      </div>
      <button type="submit">Add Cryptocurrency</button>
    </form>
  );
};

export default AddCryptoForm;
