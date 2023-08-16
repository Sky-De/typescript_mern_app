import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import AppProviders from "../../providers/AppProviders";

test("renders NotFound component which must be in doc", () => {
  render(<NotFound />, { wrapper: AppProviders });
  const notFoundImg = screen.getByRole("img", { name: /notfound/i });
  expect(notFoundImg).toBeInTheDocument();
  expect(notFoundImg).toHaveClass("notFound__img");
});
