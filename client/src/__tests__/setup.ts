import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
	cleanup();
});

// Global mock ResizeObserver (needed for react-tooltip)
global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};
