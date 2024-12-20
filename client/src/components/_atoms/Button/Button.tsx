import "./Button.scss";

type ButtonTypes =
	| "submit"
	| "form-deny"
	| "invite"
	| "button"
	| "role-select-left"
	| "role-select-right";

export default function Button({
	type,
	children,
	href,
	onClick,
}: {
	type: ButtonTypes;
	children?: string;
	href?: string;
	onClick?: () => void;
}) {
	const buttonType = type === "submit" ? "submit" : "button";
	const buttonClassName =
		type === "submit"
			? "btn-submit"
			: type === "form-deny"
				? "btn-deny"
				: type === "invite"
					? "btn-invite"
					: type === "role-select-left"
						? "btn-role-select-left"
						: type === "role-select-right"
							? "btn-role-select-right"
							: "btn-default";

	if (href) {
		return (
			<a href={href}>
				<button
					type={buttonType}
					className={`button ${buttonClassName}`}
					onClick={onClick}
				>
					{type === "invite" && !children
						? "+ Inviter un client à s'inscrire"
						: children}
				</button>
			</a>
		);
	}

	return (
		<button
			type={buttonType}
			className={`button ${buttonClassName}`}
			onClick={onClick}
		>
			{type === "invite" && !children
				? "+ Inviter un client à s'inscrire"
				: children}
		</button>
	);
}
