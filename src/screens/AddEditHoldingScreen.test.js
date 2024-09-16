import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
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

  it('renders Add New Cryptocurrency title when in add mode', () => {
    render(
      <Provider store={store}>
        <Router>
          <AddEditHoldingScreen />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Add New Cryptocurrency')).toBeInTheDocument();
  });
});
