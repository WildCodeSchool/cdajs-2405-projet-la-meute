export interface User {
	lastname: string;
	firstname: string;
	email: string;
	phone_number: string;
	city: string;
	postal_code: string;
	role: "owner" | "trainer";
}

export interface Owner extends User {
	role: "owner";
	siret: null;
	company_name: null;
}

export interface Trainer extends User {
	role: "trainer";
	siret: string;
	company_name: string;
}
