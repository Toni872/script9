-- ============================================================================
-- SCRIPT DE SEGURIDAD PARA SCRIPT9
-- Habilitar Row Level Security (RLS) y configurar políticas de acceso
-- ============================================================================

-- ============================================================================
-- 1. HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================================================

-- Habilitar RLS en todas las tablas públicas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ubicaciones ENABLE ROW LEVEL SECURITY;

-- Nota: spatial_ref_sys es una tabla del sistema de PostGIS, no necesita RLS

-- ============================================================================
-- 2. POLÍTICAS PARA LA TABLA USERS
-- ============================================================================

-- Los usuarios pueden ver su propia información
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propia información
CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

-- Permitir inserción durante el registro (será controlado por la aplicación)
CREATE POLICY "Enable insert for authenticated users only"
ON public.users
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Los administradores pueden ver todos los usuarios
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- ============================================================================
-- 3. POLÍTICAS PARA LA TABLA PROPERTIES
-- ============================================================================

-- Todos pueden ver las propiedades públicas
CREATE POLICY "Properties are viewable by everyone"
ON public.properties
FOR SELECT
USING (true);

-- Los hosts pueden insertar sus propias propiedades
CREATE POLICY "Hosts can insert own properties"
ON public.properties
FOR INSERT
WITH CHECK (
    auth.uid() = host_id AND
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role IN ('host', 'admin')
    )
);

-- Los hosts pueden actualizar sus propias propiedades
CREATE POLICY "Hosts can update own properties"
ON public.properties
FOR UPDATE
USING (auth.uid() = host_id);

-- Los hosts pueden eliminar sus propias propiedades
CREATE POLICY "Hosts can delete own properties"
ON public.properties
FOR DELETE
USING (auth.uid() = host_id);

-- Los administradores pueden hacer todo
CREATE POLICY "Admins can manage all properties"
ON public.properties
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- ============================================================================
-- 4. POLÍTICAS PARA LA TABLA PROPERTY_FEATURES
-- ============================================================================

-- Todos pueden ver las características de las propiedades
CREATE POLICY "Property features are viewable by everyone"
ON public.property_features
FOR SELECT
USING (true);

-- Los hosts pueden gestionar las características de sus propiedades
CREATE POLICY "Hosts can manage own property features"
ON public.property_features
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.properties
        WHERE id = property_id AND host_id = auth.uid()
    )
);

-- ============================================================================
-- 5. POLÍTICAS PARA LA TABLA PROPERTY_IMAGES
-- ============================================================================

-- Todos pueden ver las imágenes de las propiedades
CREATE POLICY "Property images are viewable by everyone"
ON public.property_images
FOR SELECT
USING (true);

-- Los hosts pueden gestionar las imágenes de sus propiedades
CREATE POLICY "Hosts can manage own property images"
ON public.property_images
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.properties
        WHERE id = property_id AND host_id = auth.uid()
    )
);

-- ============================================================================
-- 6. POLÍTICAS PARA LA TABLA BOOKINGS
-- ============================================================================

-- Los usuarios pueden ver sus propias reservas (como guest)
CREATE POLICY "Users can view own bookings as guest"
ON public.bookings
FOR SELECT
USING (auth.uid() = guest_id);

-- Los hosts pueden ver las reservas de sus propiedades
CREATE POLICY "Hosts can view bookings of own properties"
ON public.bookings
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.properties
        WHERE id = property_id AND host_id = auth.uid()
    )
);

-- Los guests pueden crear reservas
CREATE POLICY "Guests can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (auth.uid() = guest_id);

-- Los guests pueden actualizar sus propias reservas (cancelar, etc.)
CREATE POLICY "Guests can update own bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() = guest_id);

-- Los hosts pueden actualizar reservas de sus propiedades
CREATE POLICY "Hosts can update bookings of own properties"
ON public.bookings
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.properties
        WHERE id = property_id AND host_id = auth.uid()
    )
);

-- ============================================================================
-- 7. POLÍTICAS PARA LA TABLA REVIEWS
-- ============================================================================

-- Todos pueden ver las reseñas
CREATE POLICY "Reviews are viewable by everyone"
ON public.reviews
FOR SELECT
USING (true);

-- Los usuarios pueden crear reseñas de sus reservas completadas
CREATE POLICY "Users can create reviews for own bookings"
ON public.reviews
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.bookings
        WHERE id = booking_id 
        AND guest_id = auth.uid()
        AND status = 'completed'
    )
);

-- Los usuarios pueden actualizar sus propias reseñas
CREATE POLICY "Users can update own reviews"
ON public.reviews
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.bookings
        WHERE id = booking_id AND guest_id = auth.uid()
    )
);

-- Los usuarios pueden eliminar sus propias reseñas
CREATE POLICY "Users can delete own reviews"
ON public.reviews
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.bookings
        WHERE id = booking_id AND guest_id = auth.uid()
    )
);

-- ============================================================================
-- 8. POLÍTICAS PARA LA TABLA UBICACIONES
-- ============================================================================

-- Todos pueden ver las ubicaciones
CREATE POLICY "Ubicaciones are viewable by everyone"
ON public.ubicaciones
FOR SELECT
USING (true);

-- Solo administradores pueden insertar ubicaciones
CREATE POLICY "Admins can insert ubicaciones"
ON public.ubicaciones
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Solo administradores pueden actualizar ubicaciones
CREATE POLICY "Admins can update ubicaciones"
ON public.ubicaciones
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- ============================================================================
-- 9. CORREGIR LA FUNCIÓN find_nearby_locations
-- ============================================================================

-- Eliminar la función existente
DROP FUNCTION IF EXISTS public.find_nearby_locations(numeric, numeric, integer);

-- Recrear con search_path seguro
CREATE OR REPLACE FUNCTION public.find_nearby_locations(
    lat numeric,
    lng numeric,
    distance_km integer DEFAULT 10
)
RETURNS TABLE (
    id uuid,
    title text,
    distance_meters numeric,
    address text,
    city text,
    price_per_hour numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp  -- Fijar el search_path para seguridad
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        ST_Distance(
            p.location::geography,
            ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
        ) as distance_meters,
        p.address,
        p.city,
        p.price_per_hour
    FROM public.properties p
    WHERE ST_DWithin(
        p.location::geography,
        ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
        distance_km * 1000  -- Convertir km a metros
    )
    ORDER BY distance_meters ASC;
END;
$$;

-- Dar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION public.find_nearby_locations(numeric, numeric, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.find_nearby_locations(numeric, numeric, integer) TO anon;

-- ============================================================================
-- 10. VERIFICACIÓN
-- ============================================================================

-- Verificar que RLS está habilitado en todas las tablas
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'properties', 'property_features', 'property_images', 'bookings', 'reviews', 'ubicaciones')
ORDER BY tablename;

-- Listar todas las políticas creadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================

/*
1. RLS (Row Level Security) ahora está habilitado en todas las tablas
2. Las políticas se basan en auth.uid() que viene de Supabase Auth
3. Asegúrate de configurar NextAuth para que pase el UID correcto a Supabase
4. La tabla spatial_ref_sys es del sistema PostGIS y no necesita RLS
5. La extensión PostGIS en el schema público es normal para PostGIS

IMPORTANTE: Estas políticas asumen que usarás Supabase Auth o NextAuth 
integrado con Supabase. Si usas otro sistema de autenticación, necesitarás 
ajustar las políticas.

Para testing, puedes temporalmente hacer bypass de RLS con:
ALTER TABLE nombre_tabla FORCE ROW LEVEL SECURITY;
-- o deshabilitarlo (NO RECOMENDADO EN PRODUCCIÓN):
ALTER TABLE nombre_tabla DISABLE ROW LEVEL SECURITY;
*/
