import "./Tag.scss";

export default function NewTag({ href }: { href: string }) {
	return (
		<a href={href}>
			<span className="newTag">+ Nouvelle étiquette</span>
		</a>
	);
}
