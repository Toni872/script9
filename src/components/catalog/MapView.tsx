'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Property } from '@/components/PropertyCard';
import { MapPin, Euro, Users, Loader2 } from 'lucide-react';

// Importar Leaflet dinámicamente para evitar problemas de SSR
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);

const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);

const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

interface MapViewProps {
    properties: Property[];
    onPropertySelect?: (propertyId: string) => void;
}

export default function MapView({ properties, onPropertySelect }: MapViewProps) {
    const [isClient, setIsClient] = useState(false);
    const [L, setL] = useState<typeof import('leaflet') | null>(null);

    useEffect(() => {
        setIsClient(true);
        // Importar Leaflet CSS y módulo
        import('leaflet/dist/leaflet.css');
        import('leaflet').then((leaflet) => {
            setL(leaflet.default);

            // Fix para los iconos de Leaflet en Next.js
            const iconDefault = leaflet.default.Icon.Default.prototype as unknown as {
                _getIconUrl?: string;
            };
            delete iconDefault._getIconUrl;
            leaflet.default.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });
        });
    }, []);

    if (!isClient || !L) {
        return (
            <div className="bg-white rounded-2xl p-12 flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#8B5CF6] mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Cargando mapa...</p>
                </div>
            </div>
        );
    }

    // Calcular el centro del mapa basado en las propiedades
    const validProperties = properties.filter(p => p.latitude && p.longitude);

    if (validProperties.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 text-center min-h-[600px] flex items-center justify-center">
                <div>
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No hay propiedades con ubicación
                    </h3>
                    <p className="text-gray-600">
                        Las propiedades necesitan coordenadas para mostrarse en el mapa
                    </p>
                </div>
            </div>
        );
    }

    const centerLat = validProperties.reduce((sum, p) => sum + (p.latitude || 0), 0) / validProperties.length;
    const centerLng = validProperties.reduce((sum, p) => sum + (p.longitude || 0), 0) / validProperties.length;

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="h-[600px] w-full">
                <MapContainer
                    center={[centerLat, centerLng]}
                    zoom={10}
                    className="h-full w-full"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {validProperties.map((property) => (
                        <Marker
                            key={property.id}
                            position={[property.latitude!, property.longitude!]}
                            eventHandlers={{
                                click: () => {
                                    if (onPropertySelect) {
                                        onPropertySelect(property.id);
                                    }
                                },
                            }}
                        >
                            <Popup>
                                <div className="min-w-[250px]">
                                    {property.images && property.images.length > 0 && (
                                        <img
                                            src={property.images[0]}
                                            alt={property.title}
                                            className="w-full h-32 object-cover rounded-lg mb-2"
                                        />
                                    )}
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        {property.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {property.city}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Euro className="h-4 w-4" />
                                            <span>{property.price_per_hour}/hora</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>{property.max_guests}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`/propiedades/${property.id}`}
                                        className="block w-full text-center py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7c3aed] transition-colors text-sm font-medium"
                                    >
                                        Ver Detalles
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Leyenda */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#8B5CF6]" />
                        <span>{validProperties.length} espacios en el mapa</span>
                    </div>
                    <span className="text-xs">Haz clic en los marcadores para ver detalles</span>
                </div>
            </div>
        </div>
    );
}


