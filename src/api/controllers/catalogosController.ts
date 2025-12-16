import { createServerSupabaseClient } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export const getCatalogos = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('catalogos').select('*');
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al obtener catálogos' });
    }
};

export const createCatalogo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Los campos nombre y descripcion son requeridos' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('catalogos').insert([{ nombre, descripcion }]);
        if (error) throw new Error(error.message);
        return res.status(201).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al crear catálogo' });
    }
};

export const deleteCatalogo = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'El campo id es requerido' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('catalogos').delete().eq('id', id);
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al eliminar catálogo' });
    }
};
