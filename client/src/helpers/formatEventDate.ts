export const formatEventDateTime = (startDate: Date, endDate: Date) => {
	const formatDate = (date: Date) => {
		const days = [
			"dimanche",
			"lundi",
			"mardi",
			"mercredi",
			"jeudi",
			"vendredi",
			"samedi",
		];
		const day = days[date.getDay()];
		const dayNum = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${day} ${dayNum}/${month}/${year}`;
	};

	const formatTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${hours}h${minutes}`;
	};

	return `Le ${formatDate(startDate)} de ${formatTime(startDate)} jusqu'à ${formatTime(endDate)}`;
};
