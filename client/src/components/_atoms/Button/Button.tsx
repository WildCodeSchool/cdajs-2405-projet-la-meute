import "./Button.scss";

type ButtonTypes =
	| "submit"
	| "btn-dark"
	| "btn-light"
	| "invite"
	| "button"
	| "role-select-left"
	| "role-select-right";
/** For adding a new type: 
 * 1. Add the type in ButtonTypes up above
 * 2. Add the type in Button.scss (list $btn-types)
 * 3. Add the type in buttonClassName in Button.tsx
 * The new className must start with btn-
*/

export default function Button({
	type,
	children,
	href,
	className,
	onClick,
}: {
	type: ButtonTypes;
	children?: string;
	href?: string;
	className?: string;
	onClick?: () => void;
}) {
	const buttonType = type === "submit" ? "submit" : "button";
	const buttonClassName =
		type === "submit"
			? "btn-submit"
			: type === "btn-dark"
				? "btn-dark"
				: type === "invite"
					? "btn-invite"
					: type === "role-select-left"
						? "btn-role-select-left"
						: type === "role-select-right"
							? "btn-role-select-right"
							: "btn-light";

	if (href) {
		return (
			<a href={href} className={`button ${buttonClassName}`} onClick={onClick}>
				{type === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: children}
			</a>
		);
	}

	return (
		<button
			type={buttonType}
			className={`button ${buttonClassName} ${className}`}
			onClick={onClick}
		>
			{type === "invite" && !children
				? "+ Inviter un client à s'inscrire"
				: children}
		</button>
	);
}
