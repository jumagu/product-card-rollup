import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // simulates the DOM for component tests
    globals: true, // describe/test/expect without explicit imports
    setupFiles: ["./tests/setup.ts"], // jest-dom matchers + RTL auto-cleanup
  },
});
