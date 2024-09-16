import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DetailsScreen from './DetailsScreen';

const mockStore = configureStore([]);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

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
    mockNavigate.mockClear();
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

  it('renders a back button that navigates to home screen', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route path="/details/:id" element={<DetailsScreen />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const backButton = screen.getByText('Back to Home');
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
