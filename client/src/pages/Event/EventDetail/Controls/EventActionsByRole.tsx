import { useUser } from "@/hooks/useUser";
import EventOwnerActions from "./EventOwnerActions";
import EventTrainerActions from "./EventTrainerActions";

function EventActionsByRole() {
	const { role } = useUser();

	return (
		<>{role === "owner" ? <EventOwnerActions /> : <EventTrainerActions />}</>
	);
}

export default EventActionsByRole;
