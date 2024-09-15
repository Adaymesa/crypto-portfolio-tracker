import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoList from './CryptoList';

describe('CryptoList', () => {
  it('renders the component title', () => {
    render(<CryptoList />);
    expect(screen.getByText('Crypto Portfolio')).toBeInTheDocument();
  });
});
