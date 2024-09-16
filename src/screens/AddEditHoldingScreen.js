import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddCryptoForm from '../components/AddCryptoForm';
import EditCryptoForm from '../components/EditCryptoForm';

function AddEditHoldingScreen({ cryptos, onAddCrypto, onEditCrypto }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    if (id) {
      const existingCrypto = cryptos.find(c => c.id === id);
      setCrypto(existingCrypto);
    }
  }, [id, cryptos]);

  const handleAddCrypto = (newCrypto) => {
    onAddCrypto(newCrypto);
    navigate('/');
  };

  const handleEditCrypto = (updatedCrypto) => {
    onEditCrypto(updatedCrypto);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit Cryptocurrency' : 'Add New Cryptocurrency'}</h2>
      {id ? (
        <EditCryptoForm
          crypto={crypto}
          onSave={handleEditCrypto}
          onCancel={handleCancel}
        />
      ) : (
        <AddCryptoForm onAddCrypto={handleAddCrypto} />
      )}
    </div>
  );
}

export default AddEditHoldingScreen;
