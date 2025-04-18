import type { IconsProps } from "./icons";

export const CalendarWithClock = ({
	fill = "currentColor",
	className = "",
}: IconsProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="Layer_1"
			data-name="Layer 1"
			viewBox="0 0 24 24"
			width="512"
			height="512"
			fill={fill}
			className={className}
		>
			<title>Calendrier avec horloge</title>
			<path d="M24,7v1H0v-1C0,4.239,2.239,2,5,2h1V1c0-.552,.448-1,1-1h0c.552,0,1,.448,1,1v1h8V1c0-.552,.448-1,1-1h0c.552,0,1,.448,1,1v1h1c2.761,0,5,2.239,5,5Zm0,10c0,3.86-3.141,7-7,7s-7-3.14-7-7,3.141-7,7-7,7,3.14,7,7Zm-5,.586l-1-1v-1.586c0-.552-.448-1-1-1h0c-.552,0-1,.448-1,1v2c0,.265,.105,.52,.293,.707l1.293,1.293c.39,.39,1.024,.39,1.414,0h0c.39-.39,.39-1.024,0-1.414Zm-11-.586c0-2.829,1.308-5.35,3.349-7H0v9c0,2.761,2.239,5,5,5h6.349c-2.041-1.65-3.349-4.171-3.349-7Z" />
		</svg>
	);
};
