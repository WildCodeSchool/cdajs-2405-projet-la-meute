export const lighten = (color: string, percent: number) => {
	/** -------- Hex to RGB
	 * extract r, g and b values from color (#RRGGBB) and parse them on base 16 (hexadecimal) to return an integer
	 */
	const r = Number.parseInt(color.slice(1, 3), 16);
	const g = Number.parseInt(color.slice(3, 5), 16);
	const b = Number.parseInt(color.slice(5, 7), 16);
	/** -------- newValues
	 * 255 - value : difference between the value and 255 (which is the maximum hex value)
	 * percent / 100 : multiply it by the percentage
	 * value + : add it to the value to obtain the new lightened value
	 * Math.floor() : make sure we're working with integers
	 * Math.min(): round it to a maximum of 255 (max hex value)
	 */
	const newR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
	const newG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
	const newB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
	/** --------RGB to Hex
	 * padStart(2, '0') adds a 0 before under 10 values
	 * toString(16) turn every value to hexadecimal
	 */
	return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};
