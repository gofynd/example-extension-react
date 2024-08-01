import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { Home } from '../pages/Home';

jest.mock('../pages/Home', () => ({
  Home: () => <div data-testid="home-component">Home Component</div>
}));

describe('App Component', () => {
  test('Renders Home component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-component')).toBeInTheDocument();
  });
});
