import "./Planning.scss";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function Planning() {
	return (
		<FullCalendar
		  plugins={[ dayGridPlugin ]}
		  initialView="dayGridMonth"
		/>
	  )
}

export default Planning;
