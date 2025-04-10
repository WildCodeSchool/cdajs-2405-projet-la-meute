import { useCallback } from "react";

export const useDateFormatter = () => {
	// Function to extract date to format YYYY-MM-DD
	const extractDate = useCallback((dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split("T")[0];
	}, []);

	// Function to extract date to format HH:MM
	const extractTime = useCallback((dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().substring(11, 16);
	}, []);

	return { extractDate, extractTime };
};
