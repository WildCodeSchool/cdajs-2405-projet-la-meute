import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
	cleanup();
});

// Global mock ResizeObserver (need for react-tooltip)
global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};
