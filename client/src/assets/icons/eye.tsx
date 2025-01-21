import type { IconsProps } from "./icons";

export const Eye = ({ fill = "currentColor", className = "" }: IconsProps) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill={fill}
			stroke="#FAF4E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<title>Eye</title>
			<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
};
