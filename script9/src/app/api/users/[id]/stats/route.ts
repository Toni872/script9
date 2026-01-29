import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * GET /api/users/[id]/stats
 * Obtener estadísticas de un anfitrión
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }
        // Los anfitriones pueden ver sus propias estadísticas, los administradores pueden ver cualquiera
        if (session.user.id !== params.id && session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Access denied' },
                { status: 403 }
            );
        }
        // Verificar que el usuario existe y es un anfitrión
        const user = await UserService.getUserById(params.id);
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }
        if (user.role !== 'host') {
            return NextResponse.json(
                { success: false, error: 'User is not a host' },
                { status: 400 }
            );
        }
        // Obtener estadísticas del anfitrión
        const stats = await UserService.getHostStats(params.id);
        return NextResponse.json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error('Error fetching host stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch host statistics' },
            { status: 500 }
        );
    }
}