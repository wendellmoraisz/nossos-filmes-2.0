import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: [
            "test/unit/**/*.{test,spec}.ts",
            "test/**/*.unit.{test,spec}.ts",
          ],
          environment: "node",
          globals: true,
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: [
            "test/browser/**/*.{test,spec}.ts",
            "test/**/*.browser.{test,spec}.ts",
          ],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
          globals: true,
        },
      },
    ],
  },
});
