import { render, screen } from '@testing-library/react';
import App from './App';

test('renders crypto portfolio', () => {
  render(<App />);
  const headingElement = screen.getByText(/Crypto Portfolio/i);
  expect(headingElement).toBeInTheDocument();
});
