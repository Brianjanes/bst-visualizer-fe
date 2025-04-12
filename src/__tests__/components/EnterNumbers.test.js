import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EnterNumbers from "../../components/EnterNumbers";
import bstService from "../../services/bstService";

// Mock the bstService
jest.mock("../../services/bstService");

describe("EnterNumbers Component", () => {
  const mockTree = {
    id: "test-id",
    inputNumbers: [10, 5, 15],
    rootNode: {
      value: 10,
      left: { value: 5, left: null, right: null },
      right: { value: 15, left: null, right: null },
    },
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("submits numbers successfully and displays tree", async () => {
    // Mock the service response
    bstService.processNumbers.mockResolvedValue(mockTree);

    // Render the component
    render(<EnterNumbers />);

    // Get the input and submit button
    const input = screen.getByPlaceholderText(/enter numbers/i);
    const submitButton = screen.getByText(/create tree/i);

    // Enter numbers and submit
    fireEvent.change(input, { target: { value: "10, 5, 15" } });
    fireEvent.click(submitButton);

    // Wait for and verify the tree is displayed
    await waitFor(() => {
      expect(screen.getByText("Binary Search Tree")).toBeInTheDocument();
      expect(screen.getByText("Input: 10, 5, 15")).toBeInTheDocument();
    });

    // Verify service was called with correct numbers
    expect(bstService.processNumbers).toHaveBeenCalledWith([10, 5, 15]);
  });

  test("displays error message for invalid input", async () => {
    // Render the component
    render(<EnterNumbers />);

    // Get the input and submit button
    const input = screen.getByPlaceholderText(/enter numbers/i);
    const submitButton = screen.getByText(/create tree/i);

    // Enter invalid input (empty string) and submit
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(submitButton);

    // Verify error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Please enter valid numbers separated by commas")
      ).toBeInTheDocument();
    });

    // Verify service was not called
    expect(bstService.processNumbers).not.toHaveBeenCalled();
  });
});
