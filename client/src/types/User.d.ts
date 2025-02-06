export interface User {
	id: number;
	lastname: string;
	firstname: string;
	email: string;
	phone_number: string;
	city: string;
	postal_code: string;
	avatar: string;
	role: "owner" | "trainer";
}

export interface Owner extends User {
	role: "owner";
	description: null;
}

export interface Trainer extends User {
	role: "trainer";
	siret: string;
	description: string;
	company_name: string;
}
