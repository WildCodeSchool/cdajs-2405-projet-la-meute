import "./Button.scss";

type ButtonTypes = "submit" | "form-deny" | "invite" | "button";

export default function Button({
	type,
	children,
}: { type: ButtonTypes; children?: string }) {
	const buttonType = type === "submit" ? "submit" : "button";
	const buttonClassName =
		type === "submit"
			? "btn-submit"
			: type === "form-deny"
				? "btn-deny"
				: type === "invite"
					? "btn-invite"
					: "btn-default";

	return (
		<button type={buttonType} className={`button ${buttonClassName}`}>
			{type === "invite" && !children
				? "+ Inviter un client à s'inscrire"
				: children}
		</button>
	);
}
