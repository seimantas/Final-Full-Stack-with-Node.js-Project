import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ManeRouter } from '../ManeRouter';


it('renders header', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
});

it('renders admin login page on root path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const adminLoginElement = screen.getByLabelText('admin-login');
  expect(adminLoginElement).toBeInTheDocument();
});

it('renders register admin page on /admin-registration path', () => {
  render(
    <MemoryRouter initialEntries={['/admin-registration']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const registerAdminElement = screen.getByLabelText('register-admin');
  expect(registerAdminElement).toBeInTheDocument();
});

it('renders events page on /events path', () => {
  render(
    <MemoryRouter initialEntries={['/events']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const eventsElement = screen.getByLabelText('events');
  expect(eventsElement).toBeInTheDocument();
});

it('renders users list page on /users-list path', () => {
  render(
    <MemoryRouter initialEntries={['/users-list']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const usersListElement = screen.getByLabelText('users-list');
  expect(usersListElement).toBeInTheDocument();
});

it('renders page not found component on unknown paths', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <ManeRouter />
    </MemoryRouter>
  );
  const pageNotFoundElement = screen.getByLabelText('page-not-found');
  expect(pageNotFoundElement).toBeInTheDocument();
});