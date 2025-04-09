// src/hooks/useDateFormatter.ts
import { useCallback } from "react";

export const useDateFormatter = () => {
	// Fonction pour extraire la date au format YYYY-MM-DD
	const extractDate = useCallback((dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split("T")[0];
	}, []);

	// Fonction pour extraire l'heure au format HH:MM
	const extractTime = useCallback((dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().substring(11, 16);
	}, []);

	return { extractDate, extractTime };
};
