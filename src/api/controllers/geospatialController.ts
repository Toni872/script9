import { supabase } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export const findNearbyLocations = async (req: NextApiRequest, res: NextApiResponse) => {
    const { lat, lon, radius } = req.query;

    if (!lat || !lon || !radius) {
        return res.status(400).json({ error: 'Parámetros lat, lon y radius son requeridos' });
    }

    try {
        const { data, error } = await supabase.rpc('find_nearby_locations', {
            lat: parseFloat(lat as string),
            lon: parseFloat(lon as string),
            radius: parseFloat(radius as string),
        });

        if (error) throw new Error(error.message);

        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al buscar ubicaciones cercanas' });
    }
};
