import React, { useState, useEffect } from 'react';

const EditCryptoForm = ({ crypto, onSave, onCancel }) => {
  const [editedCrypto, setEditedCrypto] = useState(crypto);

  useEffect(() => {
    setEditedCrypto(crypto);
  }, [crypto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCrypto(prevCrypto => ({ ...prevCrypto, [name]: name === 'quantity' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCrypto);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Edit Cryptocurrency Form">
      <input
        name="name"
        value={editedCrypto.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="symbol"
        value={editedCrypto.symbol}
        onChange={handleChange}
        placeholder="Symbol"
        required
      />
      <input
        name="quantity"
        type="number"
        value={editedCrypto.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
        min="0"
        step="any"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCryptoForm;
