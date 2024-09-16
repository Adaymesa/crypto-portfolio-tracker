import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCrypto, editCrypto } from '../app/cryptoSlice';
import AddCryptoForm from '../components/AddCryptoForm';
import EditCryptoForm from '../components/EditCryptoForm';

function AddEditHoldingScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cryptos = useSelector(state => state.crypto.cryptos);
  const crypto = id ? cryptos.find(c => c.id === id) : null;

  const handleAddCrypto = (newCrypto) => {
    dispatch(addCrypto(newCrypto));
    navigate('/');
  };

  const handleEditCrypto = (updatedCrypto) => {
    dispatch(editCrypto(updatedCrypto));
    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Edit Cryptocurrency' : 'Add New Cryptocurrency'}</h2>
      {id ? (
        <EditCryptoForm crypto={crypto} onSave={handleEditCrypto} onCancel={() => navigate('/')} />
      ) : (
        <AddCryptoForm onAddCrypto={handleAddCrypto} />
      )}
    </div>
  );
}

export default AddEditHoldingScreen;
