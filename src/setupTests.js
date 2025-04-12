// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock react-d3-tree
jest.mock("react-d3-tree", () => {
  return function MockTree({ data }) {
    return <div data-testid="mock-tree">{JSON.stringify(data)}</div>;
  };
});

// Mock the bstService
jest.mock("./services/bstService", () => ({
  processNumbers: jest.fn(),
  getPreviousTrees: jest.fn(),
}));
