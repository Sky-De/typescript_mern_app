import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import AppProviders from "../../providers/AppProviders";
const post1 = {
  title: "test",
  bookAuthor: "test",
  desc: "test",
  coverUrl: "test",
  _id: "test",
  likes: [],
  createdBy: "test",
  isDetails: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  isProfile: false,
};
test("Book card component check for render", () => {
  render(<BookCard {...post1} />, { wrapper: AppProviders });
  const BookCardItem = screen.getByRole("listitem");
  expect(BookCardItem).toBeInTheDocument();
  expect(BookCardItem).toHaveClass("card");
});
