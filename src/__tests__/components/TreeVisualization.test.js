import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TreeVisualization from "../../components/TreeVisualization";

// Mock react-d3-tree as it's complex to test
jest.mock("react-d3-tree", () => {
  return function MockTree({ data }) {
    return <div data-testid="mock-tree">{JSON.stringify(data)}</div>;
  };
});

describe("TreeVisualization Component", () => {
  const mockNode = {
    value: 10,
    left: {
      value: 5,
      left: { value: 3, left: null, right: null },
      right: { value: 7, left: null, right: null },
    },
    right: {
      value: 15,
      left: null,
      right: null,
    },
  };

  test("renders tree structure correctly", () => {
    // Render the component with mock data
    render(<TreeVisualization node={mockNode} />);

    // Get the rendered tree data
    const treeContainer = screen.getByTestId("mock-tree");
    const renderedData = JSON.parse(treeContainer.textContent);

    // Verify the tree structure
    expect(renderedData).toEqual({
      name: "10",
      children: [
        {
          name: "5",
          children: [
            { name: "3", children: [] },
            { name: "7", children: [] },
          ],
        },
        {
          name: "15",
          children: [],
        },
      ],
    });
  });

  test("handles null node gracefully", () => {
    // Render the component with null node
    render(<TreeVisualization node={null} />);

    // Verify nothing is rendered
    expect(screen.queryByTestId("mock-tree")).not.toBeInTheDocument();
  });
});
