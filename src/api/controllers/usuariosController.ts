import { createServerSupabaseClient } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export const getUsuarios = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServer = createServerSupabaseClient();
    const { data, error } = await supabaseServer.from('usuarios').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
};

export const createUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServer = createServerSupabaseClient();
    const { nombre, email } = req.body;
    const { data, error } = await supabaseServer.from('usuarios').insert([{ nombre, email }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
};

export const deleteUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabaseServer = createServerSupabaseClient();
    const { id } = req.body;
    const { data, error } = await supabaseServer.from('usuarios').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
};
