import { render, screen } from '@testing-library/react';
import { UsersList } from '../UsersList';


test('renders Users List heading', () => {
  render(<UsersList />);
  const headingElement = screen.getByText(/Users List/i);
  expect(headingElement).toBeInTheDocument();
});