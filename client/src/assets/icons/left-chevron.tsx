import type { IconsProps } from "./icons";

export const LeftChevron = ({
	fill = "currentColor",
	className = "",
}: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="Bold"
			viewBox="0 0 24 24"
			fill={fill}
			className={className}
		>
			<title>Flèche retour gauche</title>
			<path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" />
		</svg>
	);
};
