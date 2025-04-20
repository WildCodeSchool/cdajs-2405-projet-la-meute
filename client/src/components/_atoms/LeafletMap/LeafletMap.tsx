// components/_atoms/LeafletMap/LeafletMap.tsx
import { useRef, useState, useCallback, useEffect } from "react";
import type { Dispatch } from "react";
import "./LeafletMap.scss";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression, Marker as LeafletMarker } from "leaflet";
import type { LocationType } from "@/types/Event";

type LeafletMapProps = {
	markerLocation?: LocationType;
	setMarkerLocation?: Dispatch<leafletMarkerType[]>;
	className?: string;
};

export type leafletMarkerType = {
	lat: number;
	lng: number;
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
	className = "",
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
		<div className={`leaflet-map-container ${className}`}>
			<MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
				<ChangeView center={position} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					position={position}
					draggable={true}
					eventHandlers={{ dragend: handleDragEnd }}
					ref={markerRef}
				>
					<Popup>Déplacez-moi !</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default LeafletMap;
