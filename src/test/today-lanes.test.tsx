import { cleanup, fireEvent, render, screen, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodayLanes } from "@/components/landing/TodayLanes";

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Today task controls", () => {
  it("completes the expired task and updates the day's remaining effort", () => {
    render(<TodayLanes />);
    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.getByText("1 left · about 25 min")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Undo completion of Check for updates on Gello" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("adds ten minutes to the expired timer", () => {
    vi.useFakeTimers();
    render(<TodayLanes />);
    fireEvent.click(screen.getByRole("button", { name: "+10 min" }));
    expect(screen.getByText("10:00")).toBeTruthy();
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByText("09:00")).toBeTruthy();
  });

  it("dismisses the expired timer without completing the task", () => {
    render(<TodayLanes />);
    fireEvent.click(screen.getByRole("button", { name: "Not yet" }));
    expect(screen.queryByText("00:00")).toBeNull();
    expect(screen.getByText("2 left · about 50 min")).toBeTruthy();
  });
});