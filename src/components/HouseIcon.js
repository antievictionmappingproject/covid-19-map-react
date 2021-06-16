import { Icon } from "leaflet";
import MarkerImage from "../assets/location-icon.svg";

const HouseIcon = new Icon({
	iconUrl: MarkerImage,
	iconRetinaUrl: MarkerImage,
	iconSize: [45, 50],
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: [0, 0],
	shadowAnchor: null,
	// className: 'preserve-icon-location',
	className: 'pulse-animation',
	// html: '<div class="pulse-animation"></div>',
});

export default HouseIcon;
