import "./AdressSearchMap.scss";
import { useState, useEffect, useCallback } from "react";
import type { Dispatch } from "react";
import LeafletMap, {
	type leafletMarkerType,
} from "@/components/_atoms/LeafletMap/LeafletMap";
import { useGeocoding } from "@/hooks/useGeocoding";
import type { LocationType } from "@/types/Event";

type AddressSearchMapProps = {
	markerLocation?: LocationType;
	setMarkerLocation?: Dispatch<leafletMarkerType[]>;
	className?: string;
};

function AddressSearchMap({
	markerLocation,
	setMarkerLocation,
}: AddressSearchMapProps) {
	const [postalCode, setPostalCode] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);
	const [localMarkerLocation, setLocalMarkerLocation] = useState<LocationType>(
		markerLocation || { latitude: 48.853495, longitude: 2.348392 },
	);

	const { isLoading, error, searchByPostalCode, searchByCity, reverseGeocode } =
		useGeocoding();

	useEffect(() => {
		if (markerLocation) {
			setLocalMarkerLocation(markerLocation);
		}
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
					if (result.postalCode) setPostalCode(result.postalCode);
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
			});

			if (setMarkerLocation) {
				setMarkerLocation([position]);
			}
		},
		[setMarkerLocation],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "postalCode") {
			setPostalCode(value);

			if (value.length === 5) {
				searchByPostalCode(value).then((result) => {
					if (result) {
						setCity(result.city || "");

						const newPosition: leafletMarkerType = {
							lat: result.lat,
							lng: result.lng,
						};

						updateMarkerPosition(newPosition);
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
							if (result.postalCode) setPostalCode(result.postalCode);

							const newPosition: leafletMarkerType = {
								lat: result.lat,
								lng: result.lng,
							};

							updateMarkerPosition(newPosition);
						}
					});
				}, 500);

				setInputTimeout(timeout);
			}
		}
	};

	const searchNow = (type: "postalCode" | "city", value: string) => {
		if (inputTimeout) {
			clearTimeout(inputTimeout);
			setInputTimeout(null);
		}

		if (type === "postalCode" && value.length >= 3) {
			searchByPostalCode(value).then((result) => {
				if (result) {
					setCity(result.city || "");

					const newPosition: leafletMarkerType = {
						lat: result.lat,
						lng: result.lng,
					};

					updateMarkerPosition(newPosition);
				}
			});
		} else if (type === "city" && value.length >= 2) {
			searchByCity(value).then((result) => {
				if (result) {
					if (result.postalCode) setPostalCode(result.postalCode);

					const newPosition: leafletMarkerType = {
						lat: result.lat,
						lng: result.lng,
					};

					updateMarkerPosition(newPosition);
				}
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const { name, value } = e.currentTarget;
			searchNow(name as "postalCode" | "city", value);
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
						name="postalCode"
						value={postalCode}
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
			/>
		</section>
	);
}

export default AddressSearchMap;
