declare module "@shared/validationRules.js" {
	export type ValidationRule = {
		pattern: RegExp;
		message: string;
	};

	export type ValidationRules = {
		[key: string]: ValidationRule;
	};

	const validationRules: ValidationRules;
	export default validationRules;
}
