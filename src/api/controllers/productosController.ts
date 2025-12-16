import { createServerSupabaseClient } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export const getProductos = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('productos').select('*');
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al obtener productos' });
    }
};

export const createProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Los campos nombre y precio son requeridos' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('productos').insert([{ nombre, precio }]);
        if (error) throw new Error(error.message);
        return res.status(201).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al crear producto' });
    }
};

export const deleteProducto = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'El campo id es requerido' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('productos').delete().eq('id', id);
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al eliminar producto' });
    }
};
