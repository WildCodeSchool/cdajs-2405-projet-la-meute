import "./Service.scss";

export default function NewService({ href }: { href: string }) {
	return (
		<a href={href}>
			<span className="newService">+ Nouvelle étiquette</span>
		</a>
	);
}
