import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddEditHoldingScreen from './AddEditHoldingScreen';

const mockStore = configureStore([]);

describe('AddEditHoldingScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: [] }
    });
  });

  it('renders AddCryptoForm when in add mode', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/add']}>
          <Routes>
            <Route path="/add" element={<AddEditHoldingScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Add New Cryptocurrency')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders EditCryptoForm when in edit mode', () => {
    const mockCryptos = [{ id: '1', name: 'Bitcoin', symbol: 'BTC', quantity: 1 }];
    store = mockStore({
      crypto: { cryptos: mockCryptos }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/edit/1']}>
          <Routes>
            <Route path="/edit/:id" element={<AddEditHoldingScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Edit Cryptocurrency')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
