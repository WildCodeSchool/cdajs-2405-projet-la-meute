import "./H1.scss";

export default function H1({
	className,
	children,
}: { className?: string; children: React.ReactNode }) {
	return <h1 className={`h1 ${className}`}>{children}</h1>;
}
