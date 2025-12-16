'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

/**
 * Componente que sincroniza el role del usuario después del login con Google
 * Lee el role guardado en localStorage y lo actualiza en Supabase
 */
export default function AuthRoleSync() {
    const { data: session, status } = useSession();

    useEffect(() => {
        const syncRole = async () => {
            // Solo ejecutar si el usuario acaba de iniciar sesión
            if (status === 'authenticated' && session?.user) {
                const pendingRole = localStorage.getItem('script9_pending_role');

                // Si hay un role pendiente, actualizarlo
                if (pendingRole && (pendingRole === 'host' || pendingRole === 'guest')) {
                    try {
                        const response = await fetch('/api/auth/update-role', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ role: pendingRole }),
                        });

                        if (response.ok) {
                            console.log('Role actualizado correctamente:', pendingRole);
                        }
                    } catch (error) {
                        console.error('Error actualizando role:', error);
                    } finally {
                        // Limpiar localStorage después de intentar actualizar
                        localStorage.removeItem('script9_pending_role');
                    }
                }
            }
        };

        syncRole();
    }, [status, session]);

    return null; // Este componente no renderiza nada
}


