import { render, screen } from "@testing-library/react";
import BookDetails from "./BookDetails";
import AppProviders from "../../providers/AppProviders";

test("BookDetails render check", () => {
  render(<BookDetails />, { wrapper: AppProviders });
  const bookDetailsElement = screen.getByRole("article");
  expect(bookDetailsElement).toBeInTheDocument();
  expect(bookDetailsElement).toHaveClass("article");
});
