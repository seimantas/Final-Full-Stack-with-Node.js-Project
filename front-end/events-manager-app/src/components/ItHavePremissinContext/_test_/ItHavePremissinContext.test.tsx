import { render, screen } from "@testing-library/react";
import { createContext, useContext } from "react";

const ItHavePremission = {
  isLogdin: false,
  setIsLogdin: (value: boolean) => {},
};

export const ItHavePremissionContext = createContext(ItHavePremission);

function MyComponent() {
  const { isLogdin } = useContext(ItHavePremissionContext);

  return (
    <div>
      <h1>{isLogdin ? "Logged In" : "Not Logged In"}</h1>
    </div>
  );
}

describe("MyComponent", () => {
  it("should render properly", () => {
    render(
      <ItHavePremissionContext.Provider value={{ isLogdin: false, setIsLogdin: () => {} }}>
        <MyComponent />
      </ItHavePremissionContext.Provider>
    );

    expect(screen.getByText("Logged In")).toBeInTheDocument();
  });
});