import React, { useState } from 'react';

const AddCryptoForm = ({ onAddCrypto }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!symbol.trim()) newErrors.symbol = 'Symbol is required';
    if (!quantity || parseFloat(quantity) <= 0) newErrors.quantity = 'Quantity must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddCrypto({
        name,
        symbol,
        quantity: parseFloat(quantity)
      });
      setName('');
      setSymbol('');
      setQuantity('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add Cryptocurrency Form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="symbol">Symbol:</label>
        <input
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        {errors.symbol && <span className="error">{errors.symbol}</span>}
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
        {errors.quantity && <span className="error">{errors.quantity}</span>}
      </div>
      <button type="submit">Add Cryptocurrency</button>
    </form>
  );
}

export default AddCryptoForm;
