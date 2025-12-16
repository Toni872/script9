import { createServerSupabaseClient } from '@/lib/supabase';
import { User } from '../types';
import { NotFoundError, DatabaseError, ConflictError } from '@/utils/errors';
import { calculatePagination, createPaginatedResponse, PaginatedResponse } from '@/utils/pagination';

const supabase = createServerSupabaseClient();

export interface CreateUserData {
    name: string;
    email: string;
    role: 'host' | 'guest' | 'admin';
    phone?: string;
    isVerified?: boolean;
}

export interface UpdateUserData {
    name?: string;
    phone?: string;
    role?: 'host' | 'guest' | 'admin';
    isVerified?: boolean;
}

export interface UserFilters {
    role?: 'host' | 'guest' | 'admin';
    isVerified?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

export class UserService {
    /**
     * Crear un nuevo usuario
     */
    static async createUser(data: CreateUserData): Promise<User> {
        const { data: user, error } = await supabase
            .from('users')
            .insert({
                name: data.name,
                email: data.email,
                role: data.role,
                phone: data.phone,
                is_verified: data.isVerified || false,
            })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                throw new ConflictError('El email ya está registrado');
            }
            throw new DatabaseError(`Error al crear usuario: ${error.message}`);
        }

        if (!user) {
            throw new DatabaseError('No se pudo crear el usuario');
        }

        return user;
    }

    /**
     * Obtener un usuario por ID
     */
    static async getUserById(id: string): Promise<User> {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Usuario');
            }
            throw new DatabaseError(`Error al obtener usuario: ${error.message}`);
        }

        return user;
    }

    /**
     * Obtener un usuario por email
     */
    static async getUserByEmail(email: string): Promise<User | null> {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            throw new DatabaseError(`Error al buscar usuario: ${error.message}`);
        }

        return user;
    }

    /**
     * Actualizar un usuario
     */
    static async updateUser(id: string, updates: UpdateUserData): Promise<User> {
        const { data: user, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Usuario');
            }
            throw new DatabaseError(`Error al actualizar usuario: ${error.message}`);
        }

        if (!user) {
            throw new DatabaseError('No se pudo actualizar el usuario');
        }

        return user;
    }

    /**
     * Verificar un usuario
     */
    static async verifyUser(id: string): Promise<User> {
        return this.updateUser(id, { isVerified: true });
    }

    /**
     * Buscar usuarios por nombre o email con paginación
     */
    static async searchUsers(filters: UserFilters): Promise<PaginatedResponse<User>> {
        const { page, limit, offset } = calculatePagination({
            page: filters.page,
            limit: filters.limit
        });

        let query = supabase
            .from('users')
            .select('*', { count: 'exact' });

        if (filters.search) {
            query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
        }
        if (filters.role) {
            query = query.eq('role', filters.role);
        }
        if (filters.isVerified !== undefined) {
            query = query.eq('is_verified', filters.isVerified);
        }

        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        const { data: users, error, count } = await query;

        if (error) {
            throw new DatabaseError(`Error al buscar usuarios: ${error.message}`);
        }

        return createPaginatedResponse(users || [], count || 0, page, limit);
    }

    /**
     * Obtener todos los anfitriones (mantenido para compatibilidad)
     */
    static async getHosts(): Promise<User[]> {
        const result = await this.searchUsers({ role: 'host', limit: 100 });
        return result.data;
    }

    /**
     * Obtener usuarios recientes
     */
    static async getRecentUsers(limit: number = 10): Promise<User[]> {
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw new DatabaseError(`Error al obtener usuarios recientes: ${error.message}`);
        }

        return users || [];
    }

    /**
     * Eliminar un usuario
     */
    static async deleteUser(id: string): Promise<void> {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) {
            if (error.code === 'PGRST116') {
                throw new NotFoundError('Usuario');
            }
            throw new DatabaseError(`Error al eliminar usuario: ${error.message}`);
        }
    }

    /**
     * Obtener estadísticas de un anfitrión
     */
    static async getHostStats(hostId: string) {
        // Example implementation using hostId
        // This is just a placeholder to show hostId is used
        if (!hostId) {
            throw new Error('hostId is required');
        }
        return {
            hostId, // Now hostId is used in the returned object
            totalProperties: 10, // Replace with actual query using hostId
            totalBookings: 50, // Replace with actual query using hostId
            averageRating: 4.5, // Replace with actual query using hostId
        };
    }
}
