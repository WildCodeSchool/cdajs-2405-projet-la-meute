import "./Button.scss";

type ButtonTypes = "form-submit" | "form-deny" | "invite" | "button";

export default function Button({
	type,
	children,
	href,
}: { type: ButtonTypes; href: string; children?: string }) {
	const buttonType = type === "form-submit" ? "submit" : "button";
	const buttonClassName =
		type === "form-submit"
			? "btn-submit"
			: type === "form-deny"
				? "btn-deny"
				: type === "invite"
					? "btn-invite"
					: "btn-default";

	return (
		<a className="button" href={href}>
			<button
				type={buttonType}
				className={buttonClassName}
				onClick={() => console.log(buttonClassName)}
			>
				{type === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: children}
			</button>
		</a>
	);
}
