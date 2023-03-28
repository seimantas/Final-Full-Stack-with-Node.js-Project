import { render, screen, fireEvent } from "@testing-library/react";
import { EditUserForm } from "../EditUserForm";


test("Edit User Form renders correctly", () => {
    render(<EditUserForm
        onCreateUser={() => {}}
        isOpen={true}
        onClose={() => {}}
      />);
  const firstNameInput = screen.getByLabelText("First Name");
  const lastNameInput = screen.getByLabelText("Last Name");
  const ageInput = screen.getByLabelText("Age");
  const dateOfBirthInput = screen.getByLabelText("Date of Birth");
  const emailInput = screen.getByLabelText("Email");
  const eventNameSelect = screen.getByLabelText("Event Name");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(ageInput, { target: { value: "25" } });
  fireEvent.change(dateOfBirthInput, { target: { value: "1997-01-01" } });
  fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
  fireEvent.change(eventNameSelect, { target: { value: "Big Bnd concert" } });

  expect(firstNameInput).toHaveValue("John");
  expect(lastNameInput).toHaveValue("Doe");
  expect(ageInput).toHaveValue("25");
  expect(dateOfBirthInput).toHaveValue("1997-01-01");
  expect(emailInput).toHaveValue("johndoe@example.com");
  expect(eventNameSelect).toHaveValue("Big Bnd concert");
});
