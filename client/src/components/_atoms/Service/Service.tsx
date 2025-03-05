import type { ServiceType } from "@/types/Service";
import "./Service.scss";

export default function Service({ service }: { service: ServiceType }) {
	return (
		<span className="service" style={{ backgroundColor: service.color }}>
			{service.smiley} {service.title}
		</span>
	);
}
