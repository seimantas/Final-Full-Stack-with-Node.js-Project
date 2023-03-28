import { render, screen } from '@testing-library/react';
import { PageNotFound } from '../PageNotFound';


describe('PageNotFound', () => {
  it('renders "Page Not Found" message', () => {
    render(<PageNotFound />);
    const messageElement = screen.getByText(/Page Not Found/i);
    expect(messageElement).toBeInTheDocument();
  });
});
