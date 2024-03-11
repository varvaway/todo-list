import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

module.exports = {
  presets: [
    // Другие настройки presets (если есть)
  ],
  plugins: [
    "@babel/plugin-proposal-private-property-in-object",
    // Другие установленные плагины (если есть)
  ]
};
