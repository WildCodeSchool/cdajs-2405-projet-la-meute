import { useNavigate } from "react-router-dom";
import "./Button.scss";

type ButtonStyles =
	| "submit"
	| "btn-dark"
	| "btn-light"
	| "invite"
	| "event"
	| "button"
	| "role-select-left"
	| "role-select-right"
	| "thin-btn-light";
/** To add a new type:
 * 1. Add the type in ButtonStyles up above
 * 2. Add the type in Button.scss (list $btn-types)
 * 3. Add the type in buttonClassName in Button.tsx
 * The new className must start with btn-
 */

/**  Button componnents */
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
				: style === "invite" || style === "event"
					? "btn-invite"
					: style === "role-select-left"
						? "btn-role-select-left"
						: style === "role-select-right"
							? "btn-role-select-right"
							: style === "thin-btn-light"
								? "thin-btn-light"
								: "btn-light";

	const navigate = useNavigate();

	if (href) {
		return (
			<a
				href={href}
				className={`button ${buttonClassName}`}
				onClick={href === "back" ? () => navigate(-1) : onClick}
			>
				{style === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: style === "event" && !children
						? "+ Ajouter un évènement"
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
				: style === "event" && !children
					? "+ Ajouter un évènement"
					: children}
		</button>
	);
}
