import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./Error";
test("renders ErrorMessage component which takes string message to render", () => {
  const message = "this is an random err";
  render(<ErrorMessage errMessage={message} />);
  const erroElement = screen.getByRole("alert");

  expect(erroElement).toHaveTextContent(message);
  expect(erroElement).toHaveClass("error__message");
});
