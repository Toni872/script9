-- Habilitar la extensión PostGIS en la base de datos
CREATE EXTENSION IF NOT EXISTS postgis;

-- Crear una tabla de ejemplo con una columna geoespacial
CREATE TABLE IF NOT EXISTS ubicaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    coordenadas GEOGRAPHY(Point, 4326) NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO ubicaciones (nombre, coordenadas)
VALUES
    ('Ubicación 1', ST_GeogFromText('POINT(-3.703790 40.416775)')),
    ('Ubicación 2', ST_GeogFromText('POINT(-0.127758 51.507351)'));

-- Consulta para encontrar ubicaciones cercanas a un punto dado
-- En este caso, buscamos ubicaciones dentro de un radio de 10 km de Madrid
SELECT id, nombre, ST_Distance(coordenadas, ST_GeogFromText('POINT(-3.703790 40.416775)')) AS distancia
FROM ubicaciones
WHERE ST_DWithin(coordenadas, ST_GeogFromText('POINT(-3.703790 40.416775)'), 10000)
ORDER BY distancia;