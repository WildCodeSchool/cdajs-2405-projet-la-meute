import { useCallback } from "react";

export const useDateFormatter = () => {
	// Function to extract date in YYYY-MM-DD format
	const extractDate = useCallback((dateInput: string | Date): string => {
		const date =
			typeof dateInput === "string" ? new Date(dateInput) : dateInput;
		return date.toISOString().split("T")[0];
	}, []);

	// Function to extract time in HH:MM format
	const extractTime = useCallback((dateInput: string | Date): string => {
		const date =
			typeof dateInput === "string" ? new Date(dateInput) : dateInput;
		return date.toISOString().substring(11, 16);
	}, []);

	return { extractDate, extractTime };
};
