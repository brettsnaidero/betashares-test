import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

// Base UI checkbox internally uses PointerEvent which jsdom doesn't provide
beforeAll(() => {
  globalThis.PointerEvent ??= class PointerEvent extends MouseEvent {
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
    }
  } as typeof globalThis.PointerEvent;
});

describe("Checkbox", () => {
  it("renders with checkbox role", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders label text when provided", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("can be rendered as checked", () => {
    render(<Checkbox checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles checked state on click (uncontrolled)", () => {
    render(<Checkbox defaultChecked={false} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("calls onCheckedChange when toggled", () => {
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it("is disabled when disabled prop is true", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  it("does not toggle when disabled", () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).toContain("custom-class");
  });
});
