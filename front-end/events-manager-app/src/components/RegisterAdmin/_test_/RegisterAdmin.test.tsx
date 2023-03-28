import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterAdmin } from '../RegisterAdmin';


test('submit button is disabled when form is invalid', () => {
  render(<RegisterAdmin />);
  
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeDisabled();

  const firstNameInput = screen.getByLabelText('First Name');
  const lastNameInput = screen.getByLabelText('Last Name');
  const passwordInput = screen.getByLabelText('Password');
  const repeatPasswordInput = screen.getByLabelText('Repeat Password');

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(repeatPasswordInput, { target: { value: 'wrongpassword' } });

  expect(submitButton).toBeDisabled();
});