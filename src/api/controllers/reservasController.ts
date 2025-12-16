import { createServerSupabaseClient } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export const getReservas = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('reservas').select('*');
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al obtener reservas' });
    }
};

export const createReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { usuario_id, producto_id, fecha } = req.body;
        if (!usuario_id || !producto_id || !fecha) {
            return res.status(400).json({ error: 'Los campos usuario_id, producto_id y fecha son requeridos' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('reservas').insert([{ usuario_id, producto_id, fecha }]);
        if (error) throw new Error(error.message);
        return res.status(201).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al crear reserva' });
    }
};

export const deleteReserva = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'El campo id es requerido' });
        }

        const supabaseServer = createServerSupabaseClient();
        const { data, error } = await supabaseServer.from('reservas').delete().eq('id', id);
        if (error) throw new Error(error.message);
        return res.status(200).json(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido al eliminar reserva' });
    }
};
