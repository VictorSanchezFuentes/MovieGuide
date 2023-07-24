import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css"
import { coordinateDTO } from "./coordinates.module";
import { useState } from "react";
import L from "leaflet";


let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16,37]
})



//this is for the pin that it's going to appear
//on the map, the red one



L.Marker.prototype.options.icon = defaultIcon;

export default function  Map(props: mapProps){
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates);
    
    return(
        <MapContainer
            center= {[35.896186, -5.292132]}
                zoom={14}
                style={{height: props.height}}
        >
            <TileLayer attribution="React Movies" 
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MapClick setCoordinates={coordinates => {
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates);

            }} />
            {coordinates.map((coordinate, index) => <Marker key={index}
            position={[coordinate.lat, coordinate.lng]} />)}
        </MapContainer>



    )
}



interface mapProps {
    height: string;
    coordinates: coordinateDTO[];
    handleMapClick(coordinates: coordinateDTO): void;

}


Map.defaultProps= {
    height: "500px"
}




//a component that will be defined only for the 
//click on the map. Kinda weird but it's
// how it's done
function MapClick(props: mapClickProps){
    useMapEvent("click", eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng})
    })

    return null;

}

//when i click on the map i want to be able to pass
//those coordinates to the map, the parent
//component

interface mapClickProps {
    setCoordinates(coordinates: coordinateDTO): void;
}