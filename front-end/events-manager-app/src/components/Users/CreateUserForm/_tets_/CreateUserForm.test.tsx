
import axios from "axios";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { CreateUserForm } from "../CreateUserForm";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CreateUserForm", () => {
  it("should create a new user", async () => {
   
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1 } });

    render(<CreateUserForm isOpen={true} onClose={() => {}} onCreateUser={() => {}} />);


    fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "30" } });
    fireEvent.change(screen.getByLabelText("Date of Birth"), { target: { value: "1993-01-01" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText("Event Name"), { target: { value: "Big Bnd concert" } });


    fireEvent.click(screen.getByRole("button", { name: "Create User" }));


    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));

    expect(onclose).toHaveBeenCalled();
  });
});