import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
	plugins: [react()],
	test: {
		silent: true,
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/__tests__/setup.ts',
		exclude: [
			'node_modules',
			'dist',
			'tests',
			'playwright.config.ts',
		],
	},
	server: {
		host: "0.0.0.0",
		port: 4200,
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@style": path.resolve(__dirname, "src/styles/global.scss"),
		},
	},
});
