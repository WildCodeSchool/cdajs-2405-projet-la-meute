import "./Button.scss";

type ButtonStyles =
	| "submit"
	| "btn-dark"
	| "btn-light"
	| "invite"
	| "button"
	| "role-select-left"
	| "role-select-right";
/** To add a new type:
 * 1. Add the type in ButtonStyles up above
 * 2. Add the type in Button.scss (list $btn-types)
 * 3. Add the type in buttonClassName in Button.tsx
 * The new className must start with btn-
 */

export default function Button({
	style,
	type,
	children,
	href,
	className,
	onClick,
}: {
	style: ButtonStyles;
	type?: "submit" | "button" | "reset" | undefined;
	children?: string;
	href?: string;
	className?: string;
	onClick?: () => void;
}) {
	const buttonType = style === "submit" ? "submit" : "button";
	const buttonClassName =
		style === "submit"
			? "btn-submit"
			: style === "btn-dark"
				? "btn-dark"
				: style === "invite"
					? "btn-invite"
					: style === "role-select-left"
						? "btn-role-select-left"
						: style === "role-select-right"
							? "btn-role-select-right"
							: "btn-light";

	if (href) {
		return (
			<a href={href} className={`button ${buttonClassName}`} onClick={onClick}>
				{style === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: children}
			</a>
		);
	}

	return (
		<button
			type={type || buttonType}
			className={`button ${buttonClassName} ${className}`}
			onClick={onClick}
		>
			{style === "invite" && !children
				? "+ Inviter un client à s'inscrire"
				: children}
		</button>
	);
}

// TODO: repenser les boutons pour que le formulaires se soumette
