import { FC } from "react";

interface Location {
    identificacion: number;
    nombre: string;
    distancia: number;
}

interface LocationCardProps {
    location: Location;
}

const LocationCard: FC<LocationCardProps> = ({ location }) => {
    return (
        <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{location.nombre}</h2>
            <p className="text-sm">Distancia: {location.distancia.toFixed(2)} metros</p>
        </div>
    );
};

export default LocationCard;
