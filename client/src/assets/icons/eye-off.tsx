import type { IconsProps } from "./icons";

export const EyeOff = ({
	fill = "currentColor",
	className = "",
}: IconsProps) => {
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
			<title>Eye-off</title>
			<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
			<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
			<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
			<path d="m2 2 20 20" />
		</svg>
	);
};
