import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 4200,
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "/src"),
			"@style": path.resolve(__dirname, "/src/styles/global.scss"),
		},
	},
});
