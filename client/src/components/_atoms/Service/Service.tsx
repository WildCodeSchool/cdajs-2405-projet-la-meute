import type { ServiceType } from "@/types/Service";
import "./Service.scss";

export default function Service({
	service,
	onClick,
}: { service: ServiceType; onClick?: () => void }) {
	return (
		<span
			className="service"
			style={{ backgroundColor: service.color }}
			onClick={onClick}
			onKeyUp={onClick}
		>
			{service.smiley} {service.title}
		</span>
	);
}
