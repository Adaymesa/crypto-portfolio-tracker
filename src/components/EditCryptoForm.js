import React, { useState, useEffect } from 'react';

const EditCryptoForm = ({ crypto, onSave, onCancel }) => {
  const [editedCrypto, setEditedCrypto] = useState(crypto);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedCrypto(crypto);
  }, [crypto]);

  const validateForm = () => {
    const newErrors = {};
    if (!editedCrypto.name.trim()) newErrors.name = 'Name is required';
    if (!editedCrypto.symbol.trim()) newErrors.symbol = 'Symbol is required';
    if (!editedCrypto.quantity || editedCrypto.quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCrypto(prevCrypto => ({ ...prevCrypto, [name]: name === 'quantity' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(editedCrypto);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Edit Cryptocurrency Form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={editedCrypto.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="symbol">Symbol:</label>
        <input
          id="symbol"
          name="symbol"
          value={editedCrypto.symbol}
          onChange={handleChange}
          required
        />
        {errors.symbol && <span>{errors.symbol}</span>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={editedCrypto.quantity}
          onChange={handleChange}
          required
          min="0"
          step="any"
        />
        {errors.quantity && <span>{errors.quantity}</span>}
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCryptoForm;
