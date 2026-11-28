import { describe, expect, it } from "vitest";
import {
  THEME_INIT_SCRIPT,
  THEME_STORAGE_KEY,
  isTheme,
  nextTheme,
  resolveInitialTheme,
  themeToggleIcon,
} from "@/lib/theme";

describe("resolveInitialTheme", () => {
  it("uses light only when light was saved", () => {
    expect(resolveInitialTheme("light")).toBe("light");
  });

  it("defaults to dark for dark, missing or invalid values", () => {
    expect(resolveInitialTheme("dark")).toBe("dark");
    expect(resolveInitialTheme(null)).toBe("dark");
    expect(resolveInitialTheme(undefined)).toBe("dark");
    expect(resolveInitialTheme("sepia")).toBe("dark");
  });
});

describe("isTheme", () => {
  it("accepts only light and dark", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

describe("nextTheme", () => {
  it("flips between light and dark", () => {
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("light");
  });
});

describe("themeToggleIcon", () => {
  it("shows the sun in light theme and the moon in dark theme", () => {
    expect(themeToggleIcon("light")).toBe("☀️");
    expect(themeToggleIcon("dark")).toBe("🌙");
  });
});

describe("theme storage contract", () => {
  it("keeps the localStorage key from the static site", () => {
    expect(THEME_STORAGE_KEY).toBe("mabu-theme");
  });

  it("inlines the same key and both theme values in the init script", () => {
    expect(THEME_INIT_SCRIPT).toContain("mabu-theme");
    expect(THEME_INIT_SCRIPT).toContain('"light"');
    expect(THEME_INIT_SCRIPT).toContain('"dark"');
    expect(THEME_INIT_SCRIPT).toContain("data-theme");
  });
});
