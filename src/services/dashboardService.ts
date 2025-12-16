import { createServerSupabaseClient } from '@/lib/supabase';
import { DatabaseError } from '@/utils/errors';

const supabase = createServerSupabaseClient();

export interface DashboardStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalBookings: number;
  activeBookings: number;
  averageRating: number;
  totalReviews: number;
  occupancyRate: number;
}

export interface EarningsData {
  date: string;
  amount: number;
}

export class DashboardService {
  /**
   * Obtener estadísticas generales del host
   */
  static async getHostStats(hostId: string): Promise<DashboardStats> {
    // Obtener propiedades del host
    const { data: properties } = await supabase
      .from('properties')
      .select('id, average_rating, total_reviews')
      .eq('host_id', hostId);

    const propertyIds = properties?.map((p) => p.id) || [];

    // Obtener bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('total_price, status, created_at, check_in, check_out')
      .in('property_id', propertyIds);

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalEarnings = bookings?.filter(b => b.status === 'completed').reduce((sum, b) => sum + Number(b.total_price) * 0.9, 0) || 0;
    const monthlyEarnings = bookings?.filter(b => b.status === 'completed' && new Date(b.created_at) >= firstDayOfMonth).reduce((sum, b) => sum + Number(b.total_price) * 0.9, 0) || 0;
    const totalBookings = bookings?.length || 0;
    const activeBookings = bookings?.filter(b => ['pending', 'confirmed'].includes(b.status)).length || 0;
    const averageRating = (properties && properties.length > 0)
      ? properties.reduce((sum, p) => sum + Number(p.average_rating), 0) / properties.length
      : 0;
    const totalReviews = properties?.reduce((sum, p) => sum + (p.total_reviews || 0), 0) || 0;

    // Calcular tasa de ocupación (días reservados / días totales en el mes)
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const totalPropertyDays = propertyIds.length * daysInMonth;
    const bookedDays = bookings?.filter(b => {
      const checkIn = new Date(b.check_in);
      const checkOut = new Date(b.check_out);
      return checkIn.getMonth() === now.getMonth() && ['confirmed', 'completed'].includes(b.status);
    }).reduce((sum, b) => {
      const checkIn = new Date(b.check_in);
      const checkOut = new Date(b.check_out);
      const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return sum + days;
    }, 0) || 0;

    const occupancyRate = totalPropertyDays > 0 ? (bookedDays / totalPropertyDays) * 100 : 0;

    return {
      totalEarnings,
      monthlyEarnings,
      totalBookings,
      activeBookings,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      occupancyRate: Math.round(occupancyRate * 10) / 10,
    };
  }

  /**
   * Obtener datos para gráfico de ingresos
   */
  static async getEarningsChart(hostId: string, months: number = 6): Promise<EarningsData[]> {
    const { data: properties } = await supabase
      .from('properties')
      .select('id')
      .eq('host_id', hostId);

    const propertyIds = properties?.map((p) => p.id) || [];

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('total_amount, created_at')
      .in('property_id', propertyIds)
      .eq('status', 'completed')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      throw new DatabaseError(`Error al obtener ingresos: ${error.message}`);
    }

    // Agrupar por mes
    const earningsByMonth: Record<string, number> = {};
    bookings?.forEach((booking) => {
      const date = new Date(booking.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      earningsByMonth[monthKey] = (earningsByMonth[monthKey] || 0) + Number(booking.total_amount) * 0.9;
    });

    return Object.entries(earningsByMonth).map(([date, amount]) => ({
      date,
      amount: Math.round(amount * 100) / 100,
    }));
  }

  /**
   * Obtener propiedades más rentables
   */
  static async getTopProperties(hostId: string, limit: number = 5): Promise<any[]> {
    const { data: properties } = await supabase
      .from('properties')
      .select('id, title, average_rating, total_reviews')
      .eq('host_id', hostId);

    if (!properties) return [];

    const propertiesWithEarnings = await Promise.all(
      properties.map(async (property) => {
        const { data: bookings } = await supabase
          .from('bookings')
          .select('total_amount')
          .eq('property_id', property.id)
          .eq('status', 'completed');

        const totalEarnings = bookings?.reduce((sum, b) => sum + Number(b.total_amount) * 0.9, 0) || 0;
        const bookingsCount = bookings?.length || 0;

        return {
          ...property,
          totalEarnings,
          bookingsCount,
        };
      })
    );

    return propertiesWithEarnings
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, limit);
  }

  /**
   * Obtener reviews recientes
   */
  static async getRecentReviews(hostId: string, limit: number = 10): Promise<any[]> {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        property:properties!reviews_property_id_fkey(id, title),
        guest:users!reviews_guest_id_fkey(id, name)
      `)
      .eq('host_id', hostId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new DatabaseError(`Error al obtener reviews: ${error.message}`);
    }

    return reviews || [];
  }
}

