import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Autocomplete } from "./Autocomplete";

const fruits = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Cherry" },
];

const defaultProps = {
  items: fruits,
  onInputValueChange: vi.fn(),
  getItemLabel: (item: (typeof fruits)[0]) => item.name,
  getItemValue: (item: (typeof fruits)[0]) => item.id,
  "aria-label": "Search fruits",
};

describe("Autocomplete", () => {
  it("renders the input with placeholder", () => {
    render(<Autocomplete {...defaultProps} placeholder="Search fruits…" />);
    expect(screen.getByPlaceholderText("Search fruits…")).toBeInTheDocument();
  });

  it("calls onInputValueChange when user types", () => {
    const onInputValueChange = vi.fn();
    render(
      <Autocomplete {...defaultProps} onInputValueChange={onInputValueChange} />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "App" } });
    expect(onInputValueChange).toHaveBeenCalledWith("App");
  });

  it("renders with custom aria-label", () => {
    render(<Autocomplete {...defaultProps} aria-label="Find a fruit" />);
    expect(screen.getByLabelText("Find a fruit")).toBeInTheDocument();
  });

  it("renders combobox input when isLoading", () => {
    render(<Autocomplete {...defaultProps} items={[]} isLoading={true} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls onSubmit when Enter is pressed", () => {
    const onSubmit = vi.fn();
    render(<Autocomplete {...defaultProps} onSubmit={onSubmit} />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalledWith("test");
  });
});
