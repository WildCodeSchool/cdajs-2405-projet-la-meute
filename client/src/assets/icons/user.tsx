import type { IconsProps } from "./icons";

export const User = ({ fill = "currentColor", className = "" }: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			id="Capa_1"
			viewBox="0 0 512 512"
			fill={fill}
			className={className}
		>
			<title>Profil</title>
			<g>
				<circle cx="256" cy="128" r="128" />
				<path d="M256,298.7c-106,0.1-191.9,86-192,192c0,11.8,9.6,21.3,21.3,21.3h341.3c11.8,0,21.3-9.6,21.3-21.3 C447.9,384.7,362,298.8,256,298.7z" />
			</g>
		</svg>
	);
};
