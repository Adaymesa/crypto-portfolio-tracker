import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DetailsScreen from './DetailsScreen';

const mockStore = configureStore([]);

describe('DetailsScreen', () => {
  const mockCrypto = {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    quantity: 1,
    price: 50000,
    total: 50000
  };

  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: [mockCrypto] }
    });
  });

  it('renders cryptocurrency details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $50000')).toBeInTheDocument();
    expect(screen.getByText('Total Value: $50000')).toBeInTheDocument();
  });

  it('displays a message when cryptocurrency is not found', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/999']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cryptocurrency not found')).toBeInTheDocument();
  });
});
