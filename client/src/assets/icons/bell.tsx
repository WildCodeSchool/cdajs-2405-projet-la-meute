import type { IconsProps } from "./icons";

export const Bell = ({ fill = "currentColor", className = "" }: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="Isolation_Mode"
			viewBox="0 0 24 24"
			width="512"
			height="512"
			fill={fill}
			className={className}
		>
			<title>Cloche</title>
			<path d="M23.608,17.013l-2.8-10.1A9.443,9.443,0,0,0,2.486,7.4L.321,17.14a2.5,2.5,0,0,0,2.441,3.042H6.905a5.285,5.285,0,0,0,10.154,0H21.2a2.5,2.5,0,0,0,2.409-3.169Zm-20.223.169,2.03-9.137a6.443,6.443,0,0,1,12.5-.326l2.628,9.463Z" />
		</svg>
	);
};
