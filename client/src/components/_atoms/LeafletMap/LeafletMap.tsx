import { useRef, useState, useCallback, type Dispatch } from "react";
import "./LeafletMap.scss";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression, Marker as LeafletMarker } from "leaflet";

type LeafletMapProps = {
	setMarkerLocation: Dispatch<leafletMarkerType[]>;
};

export type leafletMarkerType = {
	lat: number;
	lng: number;
};

function LeafletMap({ setMarkerLocation }: LeafletMapProps) {
	const INITIAL_POSITION: LatLngExpression = [48.853495, 2.348392];
	const [position, setPosition] = useState<LatLngExpression>(INITIAL_POSITION);
	const markerRef = useRef<LeafletMarker | null>(null);

	const handleDragEnd = useCallback(() => {
		const marker = markerRef.current;
		if (marker) {
			const newPosition = marker.getLatLng() as leafletMarkerType;
			setPosition(newPosition);
			setMarkerLocation([newPosition]);
		}
	}, [setMarkerLocation]);

	return (
		<MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
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
	);
}

export default LeafletMap;
