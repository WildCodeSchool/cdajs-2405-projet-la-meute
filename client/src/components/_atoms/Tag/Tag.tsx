import "./Tag.scss";

export default function Tag({
	color,
	children,
	href,
}: { color: string; children: string; href: string }) {

	return (
		<a href={href}>
			<span
				className="tag"
				style={{ backgroundColor: color }}
			>
				{children}
			</span>
		</a>
	);
}
