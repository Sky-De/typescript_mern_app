import { render, screen } from "@testing-library/react";
import Alert from "./Alert";
import AppProviders from "../../providers/AppProviders";

test("Checks alert component renders fine", () => {
  render(<Alert />, { wrapper: AppProviders });
  const alertElement = screen.getByRole("alert");
  expect(alertElement).toBeInTheDocument();
  expect(alertElement).toHaveClass("alert");
});
