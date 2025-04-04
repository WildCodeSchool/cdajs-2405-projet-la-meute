import { useState, useCallback, type FormEvent } from "react";

interface FormOptions<T> {
	initialValues: T;
	onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, unknown>>({
	initialValues,
	onSubmit,
}: FormOptions<T>) {
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setValues((prev) => ({
				...prev,
				[name]: value,
			}));
		},
		[],
	);

	const handleSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			setIsSubmitting(true);

			if (onSubmit) {
				Promise.resolve(onSubmit(values)).finally(() => {
					setIsSubmitting(false);
				});
			} else {
				setIsSubmitting(false);
			}
		},
		[values, onSubmit],
	);

	const resetForm = useCallback(() => {
		setValues(initialValues);
		setErrors({});
		setIsSubmitting(false);
	}, [initialValues]);

	const setError = useCallback((name: keyof T, error: string) => {
		setErrors((prev) => ({
			...prev,
			[name]: error,
		}));
	}, []);

	return {
		values,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
		resetForm,
		setError,
		setValues,
	};
}
