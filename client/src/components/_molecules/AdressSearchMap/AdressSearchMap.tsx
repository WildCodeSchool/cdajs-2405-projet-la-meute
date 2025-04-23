import "./AdressSearchMap.scss";
import { useState, useEffect, useCallback } from "react";
import type { Dispatch } from "react";
import LeafletMap, {
	type leafletMarkerType,
} from "@/components/_atoms/LeafletMap/LeafletMap";
import { useGeocoding } from "@/hooks/useGeocoding";
import type { Location } from "@/types/Event";

type AddressSearchMapProps = {
	markerLocation?: Location;
	setMarkerLocation?: Dispatch<leafletMarkerType[]>;
	className?: string;
};

function AddressSearchMap({
	markerLocation,
	setMarkerLocation,
	className = "",
}: AddressSearchMapProps) {
	const [postal_code, setPostalCode] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);
	const [localMarkerLocation, setLocalMarkerLocation] = useState<Location>(
		markerLocation || { latitude: 48.853495, longitude: 2.348392 },
	);

	const { isLoading, error, searchByPostalCode, searchByCity, reverseGeocode } =
		useGeocoding();

	useEffect(() => {
		if (markerLocation) {
			setLocalMarkerLocation(markerLocation);
		}
		if (markerLocation?.postal_code) setPostalCode(markerLocation.postal_code);
		if (markerLocation?.city) setCity(markerLocation.city);
	}, [markerLocation]);

	useEffect(() => {
		if (
			localMarkerLocation.latitude !== 0 ||
			localMarkerLocation.longitude !== 0
		) {
			reverseGeocode(
				localMarkerLocation.latitude,
				localMarkerLocation.longitude,
			).then((result) => {
				if (result) {
					if (result.postal_code) setPostalCode(result.postal_code);
					if (result.city) setCity(result.city);
				}
			});
		}
	}, [localMarkerLocation, reverseGeocode]);

	const updateMarkerPosition = useCallback(
		(position: leafletMarkerType) => {
			setLocalMarkerLocation({
				latitude: position.lat,
				longitude: position.lng,
				postal_code,
				city,
			});

			if (setMarkerLocation) {
				const markerWithInfo = [
					{
						...position,
						postal_code,
						city,
					},
				];
				setMarkerLocation(markerWithInfo);
			}
		},
		[setMarkerLocation, postal_code, city],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "postal_code") {
			setPostalCode(value);

			if (value.length === 5) {
				searchByPostalCode(value).then((result) => {
					if (result) {
						const newCity = result.city || "";
						setCity(newCity);

						const newPosition: leafletMarkerType = {
							lat: result.lat,
							lng: result.lng,
						};

						updateMarkerPosition({
							...newPosition,
							postal_code: value.toString(),
							city: newCity,
						});
					}
				});
			}
		} else if (name === "city") {
			setCity(value);

			if (inputTimeout) {
				clearTimeout(inputTimeout);
			}

			if (value.length >= 3) {
				const timeout = setTimeout(() => {
					searchByCity(value).then((result) => {
						if (result) {
							const newPostalCode = result.postal_code || "";
							if (result.postal_code) setPostalCode(newPostalCode);

							const newPosition: leafletMarkerType = {
								lat: result.lat,
								lng: result.lng,
							};

							updateMarkerPosition({
								...newPosition,
								postal_code: newPostalCode,
								city: value,
							});
						}
					});
				}, 500);

				setInputTimeout(timeout);
			}
		}
	};
	const searchNow = (type: "postal_code" | "city", value: string) => {
		if (inputTimeout) {
			clearTimeout(inputTimeout);
			setInputTimeout(null);
		}

		if (type === "postal_code" && value.length >= 3) {
			searchByPostalCode(value).then((result) => {
				if (result) {
					const newCity = result.city || "";
					setCity(newCity);

					const newPosition: leafletMarkerType = {
						lat: result.lat,
						lng: result.lng,
					};

					updateMarkerPosition({
						...newPosition,
						postal_code: value.toString(),
						city: newCity,
					});
				}
			});
		} else if (type === "city" && value.length >= 2) {
			searchByCity(value).then((result) => {
				if (result) {
					const newPostalCode = result.postal_code || "";
					if (result.postal_code) setPostalCode(newPostalCode);

					const newPosition: leafletMarkerType = {
						lat: result.lat,
						lng: result.lng,
					};

					updateMarkerPosition({
						...newPosition,
						postal_code: newPostalCode,
						city: value,
					});
				}
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const { name, value } = e.currentTarget;
			searchNow(name as "postal_code" | "city", value);
		}
	};

	const handleMarkerMove = useCallback(
		(positions: leafletMarkerType[]) => {
			if (positions && positions.length > 0) {
				const newPos = positions[0];

				setLocalMarkerLocation({
					latitude: newPos.lat,
					longitude: newPos.lng,
				});

				if (setMarkerLocation) {
					setMarkerLocation(positions);
				}
			}
		},
		[setMarkerLocation],
	);

	useEffect(() => {
		return () => {
			if (inputTimeout) {
				clearTimeout(inputTimeout);
			}
		};
	}, [inputTimeout]);

	return (
		<section className="adressSearchMap">
			<span className="adressSearchMap__inputContainer">
				<label>
					Code postal
					<input
						type="text"
						name="postal_code"
						value={postal_code}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Code postal"
						disabled={isLoading}
						maxLength={5}
					/>
				</label>
				<label>
					Ville
					<input
						type="text"
						name="city"
						value={city}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Ville"
						disabled={isLoading}
					/>
				</label>
			</span>
			<span className="adressSearchMap__messages">
				{isLoading && <span>Recherche...</span>}
				{error && <span className="error-message">{error}</span>}
			</span>

			<LeafletMap
				markerLocation={localMarkerLocation}
				setMarkerLocation={handleMarkerMove}
				className={className}
			/>
		</section>
	);
}

export default AddressSearchMap;
