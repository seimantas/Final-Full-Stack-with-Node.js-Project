import { render, screen } from "@testing-library/react";
import AdminLogin from "../AdminLogin";


describe("AdminLogin", () => {
  it("renders the login form", () => {
    render(<AdminLogin />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});