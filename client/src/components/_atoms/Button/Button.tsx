import "./Button.scss";

type ButtonTypes = "form-submit" | "form-deny" | "invite" | "button" | "role-select";

export default function Button({
	type,
	children,
	href,
	onClick,
}: { type: ButtonTypes; href: string; children?: string; onClick?: () => void;}) {
	const buttonType = type === "form-submit" ? "submit" : "button";
	const buttonClassName =
		type === "form-submit"
			? "btn-submit"
			: type === "form-deny"
				? "btn-deny"
				: type === "invite"
					? "btn-invite"
				: type === "role-select"
					? "btn-role-select"
					: "btn-default";

	return (
		<a className="button" href={href} onClick={onClick}>
			<button
				type={buttonType}
				className={buttonClassName}
				onClick={onClick}
			>
				{type === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: children}
			</button>
		</a>
	);
}
