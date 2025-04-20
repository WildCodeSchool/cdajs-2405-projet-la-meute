import { useState, useCallback } from "react";

export type GeocodingResult = {
	lat: number;
	lng: number;
	postal_code?: string;
	city?: string;
};

export type UseGeocodingReturn = {
	isLoading: boolean;
	error: string | null;
	validateCoordinates: (lat: number, lng: number) => boolean;
	searchByPostalCode: (code: string) => Promise<GeocodingResult | null>;
	searchByCity: (cityName: string) => Promise<GeocodingResult | null>;
	searchByAddress: (params: {
		postal_code?: string;
		city?: string;
	}) => Promise<GeocodingResult | null>;
	reverseGeocode: (
		lat: number,
		lng: number,
	) => Promise<{ postal_code?: string; city?: string } | null>;
};

export const useGeocoding = (): UseGeocodingReturn => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const searchByPostalCode = useCallback(
		async (code: string): Promise<GeocodingResult | null> => {
			if (!code || code.trim().length < 2) {
				setError("Code postal invalide");
				return null;
			}

			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?postalcode=${code}&country=France&format=json&addressdetails=1&limit=1`,
				);

				if (!response.ok) {
					throw new Error("Erreur lors de la recherche");
				}

				const data = await response.json();

				if (data && data.length > 0) {
					const result = data[0];
					const cityName =
						result.address?.city ||
						result.address?.town ||
						result.address?.village ||
						"";

					return {
						lat: Number.parseFloat(result.lat),
						lng: Number.parseFloat(result.lon),
						postal_code: result.address?.postcode,
						city: cityName,
					};
				}

				setError("Aucun résultat trouvé");
				return null;
			} catch (err) {
				setError("Erreur lors de la recherche");
				console.error(err);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const searchByCity = useCallback(
		async (cityName: string): Promise<GeocodingResult | null> => {
			if (!cityName || cityName.trim().length < 2) {
				setError("Nom de ville invalide");
				return null;
			}

			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?city=${cityName}&country=France&format=json&addressdetails=1&limit=1`,
				);

				if (!response.ok) {
					throw new Error("Erreur lors de la recherche");
				}

				const data = await response.json();

				if (data && data.length > 0) {
					const result = data[0];
					const cityName =
						result.address?.city ||
						result.address?.town ||
						result.address?.village ||
						"";

					return {
						lat: Number.parseFloat(result.lat),
						lng: Number.parseFloat(result.lon),
						postal_code: result.address?.postcode,
						city: cityName,
					};
				}

				setError("Aucun résultat trouvé");
				return null;
			} catch (err) {
				setError("Erreur lors de la recherche");
				console.error(err);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const searchByAddress = useCallback(
		async (params: {
			postal_code?: string;
			city?: string;
		}): Promise<GeocodingResult | null> => {
			const { postal_code, city } = params;

			if (
				(!postal_code || postal_code.length < 2) &&
				(!city || city.length < 2)
			) {
				setError("Veuillez fournir un code postal ou une ville");
				return null;
			}

			try {
				setIsLoading(true);
				setError(null);

				let query = "";
				if (postal_code && postal_code.length >= 2) {
					query += `postalcode=${postal_code}`;
				}

				if (city && city.length >= 2) {
					if (query) query += "&";
					query += `city=${city}`;
				}

				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?${query}&country=France&format=json&addressdetails=1&limit=1`,
				);

				if (!response.ok) {
					throw new Error("Erreur lors de la recherche");
				}

				const data = await response.json();

				if (data && data.length > 0) {
					const result = data[0];
					const cityName =
						result.address?.city ||
						result.address?.town ||
						result.address?.village ||
						"";

					return {
						lat: Number.parseFloat(result.lat),
						lng: Number.parseFloat(result.lon),
						postal_code: result.address?.postcode,
						city: cityName,
					};
				}

				setError("Aucun résultat trouvé");
				return null;
			} catch (err) {
				setError("Erreur lors de la recherche");
				console.error(err);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const reverseGeocode = useCallback(
		async (
			lat: number,
			lng: number,
		): Promise<{ postal_code?: string; city?: string } | null> => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
				);

				if (!response.ok) {
					throw new Error("Erreur lors du géocodage inverse");
				}

				const data = await response.json();

				if (data?.address) {
					const { postcode, city, town, village } = data.address;

					return {
						postal_code: postcode,
						city: city || town || village || "",
					};
				}

				return null;
			} catch (err) {
				console.error("Erreur lors du géocodage inverse:", err);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const validateCoordinates = useCallback(
		(lat: number, lng: number): boolean => {
			// Vérifier que les coordonnées sont dans des plages valides
			if (Number.isNaN(lat) || Number.isNaN(lng)) return false;
			if (lat === 0 && lng === 0) return false;
			if (lat < -90 || lat > 90) return false;
			if (lng < -180 || lng > 180) return false;

			return true;
		},
		[],
	);

	return {
		isLoading,
		error,
		validateCoordinates,
		searchByPostalCode,
		searchByCity,
		searchByAddress,
		reverseGeocode,
	};
};

export default useGeocoding;
