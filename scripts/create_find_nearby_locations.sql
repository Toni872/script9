-- Procedimiento almacenado para encontrar ubicaciones cercanas
CREATE OR REPLACE FUNCTION find_nearby_locations(lat DOUBLE PRECISION, lon DOUBLE PRECISION, radius DOUBLE PRECISION)
RETURNS TABLE (
    identificacion INT,
    nombre VARCHAR,
    distancia DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT ubicaciones.id AS identificacion, ubicaciones.nombre AS nombre, 
           ST_Distance(ubicaciones.coordenadas, ST_MakePoint(lon, lat)::geography) AS distancia
    FROM ubicaciones
    WHERE ST_DWithin(ubicaciones.coordenadas, ST_MakePoint(lon, lat)::geography, radius)
    ORDER BY distancia;
END;
$$ LANGUAGE plpgsql;