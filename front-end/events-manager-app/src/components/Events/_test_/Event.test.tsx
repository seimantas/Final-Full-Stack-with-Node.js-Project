import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TEvent } from '../type';
import { Events } from '../Events';

jest.mock('axios');

const mockEvents: TEvent[] = [
  { _id: '1', eventName: 'event1' },
  { _id: '2', eventName: 'event2' },
];

describe('Events component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fakeToken');
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  it('renders a list of events and allows creating new events', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockEvents });

    render(<Events />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(screen.getByText('event1')).toBeInTheDocument();
    expect(screen.getByText('event2')).toBeInTheDocument();

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: { _id: '3', eventName: 'event3' } });

    fireEvent.change(screen.getByLabelText('New Event Name:'), { target: { value: 'event3' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(screen.getByText('event3')).toBeInTheDocument();
  });

  it('displays a list of participants when an event is clicked and allows deleting events', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockEvents });

    render(<Events />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    fireEvent.click(screen.getByText('event1'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(screen.getByText('event1 Participants')).toBeInTheDocument();

    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(axios.delete).toHaveBeenCalled());

    expect(screen.queryByText('event1')).not.toBeInTheDocument();
  });

  it('displays an error message when API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<Events />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
  });
});