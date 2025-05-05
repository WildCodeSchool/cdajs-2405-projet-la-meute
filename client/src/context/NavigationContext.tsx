import { createContext, useState, useContext, type ReactNode } from "react";

interface NavigationContextType {
	currentPage: string;
	setCurrentPage: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
	currentPage: "",
	setCurrentPage: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [currentPage, setCurrentPage] = useState("");

	return (
		<NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation() {
	return useContext(NavigationContext);
}
