import React from 'react';
import { useParams } from 'react-router-dom';

function AddEditHoldingScreen() {
  const { id } = useParams();

  return (
    <div>
      <h2>{id ? 'Edit Cryptocurrency' : 'Add New Cryptocurrency'}</h2>
    </div>
  );
}

export default AddEditHoldingScreen;
