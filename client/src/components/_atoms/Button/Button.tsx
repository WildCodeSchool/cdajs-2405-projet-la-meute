import { useNavigate, Link } from "react-router-dom";
import "./Button.scss";

type ThinButtonColor = "orange" | "blue" | "green";

type ButtonStyles =
	| "submit"
	| "btn-dark"
	| "btn-dark-secondary"
	| "btn-light"
	| "invite"
	| "event"
	| "button"
	| "role-select-left"
	| "role-select-right"
	| "none"
	| { type: "thin-btn-light"; color: ThinButtonColor };

interface BaseButtonProps {
	type?: "submit" | "button" | "reset";
	children?: string;
	href?: string;
	className?: string;
	onClick?: () => void;
}

interface RegularButtonProps extends BaseButtonProps {
	style: Exclude<ButtonStyles, { type: "thin-btn-light" }>;
}

interface ThinButtonProps extends BaseButtonProps {
	style: { type: "thin-btn-light"; color: ThinButtonColor };
}

type ButtonProps = RegularButtonProps | ThinButtonProps;
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
	disabled = false,
	onClick,
}: ButtonProps & { disabled?: boolean }) {
	const buttonType = style === "submit" ? "submit" : "button";
	const buttonClassName =
		typeof style === "object"
			? `thin-btn-light thin-btn-${style.color}`
			: style === "submit"
				? "btn-submit"
				: style === "btn-dark"
					? "btn-dark"
					: style === "btn-dark-secondary"
						? "btn-dark-secondary"
						: style === "invite" || style === "event"
							? "btn-invite"
							: style === "role-select-left"
								? "btn-role-select-left"
								: style === "role-select-right"
									? "btn-role-select-right"
									: style === "none"
										? ""
										: "btn-light";
	const navigate = useNavigate();

	if (href) {
		return (
			<Link
				to={href}
				className={`button ${buttonClassName} ${className}`}
				onClick={href === "back" ? () => navigate(-1) : onClick}
			>
				{style === "invite" && !children
					? "+ Inviter un client à s'inscrire"
					: style === "event" && !children
						? "+ Ajouter un évènement"
						: children}
			</Link>
		);
	}

	return (
		<button
			type={type || buttonType}
			className={`button ${buttonClassName} ${className}`}
			disabled={disabled}
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
