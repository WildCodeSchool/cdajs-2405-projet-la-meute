import type { Location } from "@/types/Event";
import type { LatLngExpression, Marker as LeafletMarker } from "leaflet";
import { type Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./LeafletMap.scss";

type LeafletMapProps = {
	markerLocation?: Location;
	setMarkerLocation?: Dispatch<leafletMarkerType[]>;
	display: boolean;
};

export type leafletMarkerType = {
	lat: number;
	lng: number;
	postal_code?: string;
	city?: string;
};

function ChangeView({ center }: { center: LatLngExpression }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center, 13);
	}, [center, map]);
	return null;
}

function LeafletMap({
	markerLocation,
	setMarkerLocation,
	display,
}: LeafletMapProps) {
	const DEFAULT_POSITION: LatLngExpression = [48.853495, 2.348392];

	const hasValidInitialMarker =
		markerLocation &&
		(markerLocation.latitude !== 0 || markerLocation.longitude !== 0);

	const initialPosition = hasValidInitialMarker
		? ([markerLocation.latitude, markerLocation.longitude] as LatLngExpression)
		: DEFAULT_POSITION;

	const [position, setPosition] = useState<LatLngExpression>(initialPosition);
	const markerRef = useRef<LeafletMarker | null>(null);

	useEffect(() => {
		if (markerLocation) {
			const newPosition = [
				markerLocation.latitude,
				markerLocation.longitude,
			] as LatLngExpression;

			setPosition(newPosition);
		}
	}, [markerLocation]);

	const handleDragEnd = useCallback(() => {
		const marker = markerRef.current;
		if (marker && setMarkerLocation) {
			const newPosition: leafletMarkerType = marker?.getLatLng() ?? {
				lat: 0,
				lng: 0,
			};
			setPosition(newPosition);
			setMarkerLocation([newPosition]);
		}
	}, [setMarkerLocation]);

	return (
		<MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
			<ChangeView center={position} />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				position={position}
				draggable={!display}
				eventHandlers={{ dragend: handleDragEnd }}
				ref={markerRef}
			>
				{!display && <Popup>Déplacez-moi !</Popup>}
			</Marker>
		</MapContainer>
	);
}

export default LeafletMap;
