import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes, MemoryRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import urlJoin from "url-join";
const EXAMPLE_MAIN_URL = window.location.origin;

const mock = new MockAdapter(axios)

const mockProducts = {
    items: [
      {
        is_active: true,
        media: [{ type: 'image', url: 'image1.png' }],
        name: 'Product 1',
        item_code: 'ITEM001',
        brand: { name: 'Brand A' },
        category_slug: 'Category A',
        id:"2"
      },
      {
        is_active: false,
        media: [],
        name: 'Product 2',
        item_code: 'ITEM002',
        brand: { name: 'Brand B' },
        category_slug: 'Category B',
        id:"1"
      },
    ],
}

const renderHomeWithParams = () => {
  return render(
    <Router>
      <Routes>
        <Route path="/:application_id?" element={<Home />} />
      </Routes>
    </Router>
  );
};

describe('Test Home component', () => {
  beforeEach( () =>{
    mock.onGet(urlJoin(EXAMPLE_MAIN_URL, '/api/products')).reply(
      200,
      mockProducts
    )
    mock.onGet(urlJoin(EXAMPLE_MAIN_URL, `/api/products/application/000000000000000000000001`)).reply(
        200,
        mockProducts
    )
  }); 
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renders loader when page is loading', () => {
    const { getByTestId } = renderHomeWithParams({});
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  test('It should render product list for company', async () => {
    const { getByText, getByTestId } = renderHomeWithParams({});

    await waitFor(() => {
      expect(getByTestId('product-name-1')).toBeInTheDocument();
      expect(getByTestId('product-item-code-1')).toBeInTheDocument();
      expect(getByText('Brand A')).toBeInTheDocument();
      expect(getByText('Category A')).toBeInTheDocument();
    });
  });

  test('It should render product list for sales channel', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/application/000000000000000000000001']}>
        <Routes>
          <Route path="/application/:application_id" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByTestId('product-name-1')).toBeInTheDocument();
      expect(getByText('Brand A')).toBeInTheDocument();
      expect(getByText('Category A')).toBeInTheDocument();
    });
  });

});