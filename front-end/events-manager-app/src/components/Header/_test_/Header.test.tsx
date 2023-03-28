import { render, screen } from "@testing-library/react";
import { ItHavePremissionContext } from "../../ItHavePremissinContext/ItHavePremissionContext";
import { Header } from "../Header";


describe("Header", () => {


    
  it("displays 'Event Manager' text", () => {
    render(<Header />);
    expect(screen.getByText("Event Manager")).toBeInTheDocument();
  });

  it("displays 'Events' and 'Users' buttons if user is logged in", () => {
    const setIsLogdin = jest.fn();
    render(
        <ItHavePremissionContext.Provider value={{ isLogdin: false, setIsLogdin: () => {} }}>
          <Header />
        </ItHavePremissionContext.Provider>
      );
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("displays 'You are not logged in' text if user is not logged in", () => {
    render(
        <ItHavePremissionContext.Provider value={{ isLogdin: false, setIsLogdin: () => {} }}>
          <Header />
        </ItHavePremissionContext.Provider>
      );
    expect(screen.getByText("You are not logged in")).toBeInTheDocument();
  });

  it("calls setIsLogdin and removes token from localStorage when Log out button is clicked", () => {
    const setIsLogdin = jest.fn();
    localStorage.setItem("token", "dummyToken");
    render(
      <ItHavePremissionContext.Provider value={{ isLogdin: true, setIsLogdin }}>
        <Header />
      </ItHavePremissionContext.Provider>
    );
    const logoutButton = screen.getByText("Log out");
    expect(logoutButton).toBeInTheDocument();

    logoutButton.click();

    expect(localStorage.getItem("token")).toBeNull();
    expect(setIsLogdin).toHaveBeenCalledWith(false);
  });
});