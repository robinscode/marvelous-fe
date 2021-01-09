import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders root component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Marvelous v2/i);
  expect(linkElement).toBeInTheDocument();
});
