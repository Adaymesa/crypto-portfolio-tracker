import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import App from './App';
import { initializeApp } from './app/cryptoSlice';

jest.mock('./screens/HomeScreen', () => () => <div>Home Screen</div>);
jest.mock('./screens/AddEditHoldingScreen', () => () => <div>Add/Edit Holding Screen</div>);
jest.mock('./screens/DetailsScreen', () => () => <div>Details Screen</div>);
jest.mock('./app/cryptoSlice', () => ({
  ...jest.requireActual('./app/cryptoSlice'),
  initializeApp: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      crypto: { cryptos: [], allCoins: [], status: 'idle', error: null }
    });
    store.dispatch = jest.fn();
  });

  it('renders home screen by default', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Home Screen')).toBeInTheDocument();
  });

  it('dispatches initializeApp on mount', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(initializeApp).toHaveBeenCalled();
    });
  });
});

