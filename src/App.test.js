import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

jest.mock('./screens/HomeScreen', () => () => <div>Home Screen</div>);
jest.mock('./screens/AddEditHoldingScreen', () => () => <div>Add/Edit Holding Screen</div>);
jest.mock('./screens/DetailsScreen', () => () => <div>Details Screen</div>);

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Crypto Portfolio')).toBeInTheDocument();
  });

  it('renders home screen by default', () => {
    render(<App />);
    expect(screen.getByText('Home Screen')).toBeInTheDocument();
  });
});

