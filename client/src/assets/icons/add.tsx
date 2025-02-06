import type { IconsProps } from "./icons";

export const Add = ({ fill = "currentColor", className = "" }: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill={fill}
			className={className}
		>
			<title>Ajouter</title>
			<path d="M12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm5-9a1.5 1.5 0 0 1-1.5 1.5h-2v2a1.5 1.5 0 0 1-3 0v-2h-2a1.5 1.5 0 0 1 0-3h2v-2a1.5 1.5 0 0 1 3 0v2h2a1.5 1.5 0 0 1 1.5 1.5z" />
		</svg>
	);
};
