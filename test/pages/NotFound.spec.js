import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../../pages/NotFound';

test('renders NotFound component with correct content', () => {
  const { getByText, container } = render(<NotFound />);
  expect(getByText('404')).toBeInTheDocument();
  const notFoundDiv = container.querySelector('.not-found');
  expect(notFoundDiv).toBeInTheDocument();
});
