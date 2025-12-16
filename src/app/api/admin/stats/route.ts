import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();

        // Verificar que el usuario es admin
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const supabase = createServerSupabaseClient();

        // Total de usuarios
        const { count: totalUsers } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });

        // Total de propiedades
        const { count: totalProperties } = await supabase
            .from('properties')
            .select('*', { count: 'exact', head: true });

        // Propiedades pendientes de aprobación
        const { count: pendingApprovals } = await supabase
            .from('properties')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        // Total de reservas
        const { count: totalBookings } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true });

        // Reservas activas (confirmadas y futuras)
        const { count: activeBookings } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'confirmed')
            .gte('start_time', new Date().toISOString());

        // Ingresos totales (suma de total_price de reservas confirmadas y completadas)
        const { data: revenueData } = await supabase
            .from('bookings')
            .select('total_price')
            .in('status', ['confirmed', 'completed', 'paid']);

        const totalRevenue = revenueData?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0;

        // Crecimiento de usuarios (últimos 30 días vs 30 días anteriores)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const { count: recentUsers } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', thirtyDaysAgo.toISOString());

        const { count: previousUsers } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sixtyDaysAgo.toISOString())
            .lt('created_at', thirtyDaysAgo.toISOString());

        const userGrowth = previousUsers && previousUsers > 0
            ? Math.round(((recentUsers || 0) - previousUsers) / previousUsers * 100)
            : 0;

        // Crecimiento de ingresos (últimos 30 días vs 30 días anteriores)
        const { data: recentRevenue } = await supabase
            .from('bookings')
            .select('total_price')
            .in('status', ['confirmed', 'completed', 'paid'])
            .gte('created_at', thirtyDaysAgo.toISOString());

        const { data: previousRevenue } = await supabase
            .from('bookings')
            .select('total_price')
            .in('status', ['confirmed', 'completed', 'paid'])
            .gte('created_at', sixtyDaysAgo.toISOString())
            .lt('created_at', thirtyDaysAgo.toISOString());

        const recentRevenueSum = recentRevenue?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;
        const previousRevenueSum = previousRevenue?.reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;

        const revenueGrowth = previousRevenueSum > 0
            ? Math.round((recentRevenueSum - previousRevenueSum) / previousRevenueSum * 100)
            : 0;

        return NextResponse.json({
            totalUsers: totalUsers || 0,
            totalProperties: totalProperties || 0,
            totalBookings: totalBookings || 0,
            totalRevenue: Math.round(totalRevenue),
            activeBookings: activeBookings || 0,
            pendingApprovals: pendingApprovals || 0,
            userGrowth,
            revenueGrowth,
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { error: 'Error al obtener estadísticas' },
            { status: 500 }
        );
    }
}





