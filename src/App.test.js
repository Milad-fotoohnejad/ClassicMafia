import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//  the tests should be written in here
test('Twelve devided by two should be six', () => {
  expect(12 / 2).toBe(6);
});

// String testing
test('String should be a string', () => {
  expect(typeof 'string').toBe('string');
});