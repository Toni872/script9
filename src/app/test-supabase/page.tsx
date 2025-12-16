'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

interface ConnectionStatus {
    status: 'checking' | 'connected' | 'error';
    message: string;
    details?: unknown;
}

export default function TestSupabasePage() {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
        status: 'checking',
        message: 'Verificando conexión...'
    });
    const [userCount, setUserCount] = useState<number | null>(null);

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        try {
            // Test 1: Verificar que las variables de entorno están cargadas
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Variables de entorno de Supabase no configuradas');
            }

            // Test 2: Intentar hacer una consulta simple
            const { error, count } = await supabase
                .from('users')
                .select('*', { count: 'exact', head: true });

            if (error) {
                // Si el error es porque la tabla no existe, aún significa que la conexión funciona
                if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
                    setConnectionStatus({
                        status: 'connected',
                        message: '⚠️ Conexión exitosa, pero la tabla "users" no existe. Necesitas ejecutar los scripts SQL.',
                        details: {
                            url: supabaseUrl,
                            error: error.message
                        }
                    });
                } else {
                    throw error;
                }
            } else {
                setConnectionStatus({
                    status: 'connected',
                    message: '✅ Conexión exitosa con Supabase',
                    details: {
                        url: supabaseUrl,
                        userCount: count
                    }
                });
                setUserCount(count);
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            setConnectionStatus({
                status: 'error',
                message: `❌ Error: ${errorMessage}`,
                details: error
            });
        }
    };

    const testQuery = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .limit(5);

            if (error) throw error;

            alert(`Consulta exitosa. Usuarios encontrados: ${data?.length || 0}\n\n${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error en la consulta: ${errorMessage}`);
        }
    };

    const createTestUser = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .insert({
                    email: `test${Date.now()}@script9.com`,
                    name: 'Usuario de Prueba',
                    role: 'guest'
                })
                .select();

            if (error) throw error;

            alert('✅ Usuario de prueba creado exitosamente:\n\n' + JSON.stringify(data, null, 2));
            checkConnection(); // Refrescar el contador
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`❌ Error al crear usuario: ${errorMessage}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    🗄️ Prueba de Conexión Supabase
                </h1>

                {/* Estado de la conexión */}
                <div className={
                    connectionStatus.status === 'connected' ? styles.successBox :
                        connectionStatus.status === 'error' ? styles.errorBox :
                            styles.infoBox
                }>
                    <h2 className={styles.statusTitle}>
                        Estado de la Conexión
                    </h2>
                    <p className={styles.statusMessage}>
                        {connectionStatus.message}
                    </p>

                    {connectionStatus.details !== undefined && (
                        <details className={styles.details}>
                            <summary>Detalles técnicos</summary>
                            <pre className={styles.codeBlock}>
                                {typeof connectionStatus.details === 'object'
                                    ? JSON.stringify(connectionStatus.details, null, 2)
                                    : String(connectionStatus.details)}
                            </pre>
                        </details>
                    )}
                </div>

                {/* Información de configuración */}
                <div className={styles.configSection}>
                    <h3 className={styles.sectionTitle}>📋 Configuración</h3>
                    <div className={styles.configGrid}>
                        <div className={styles.configItem}>
                            <strong>URL:</strong>
                            <code className={styles.code}>
                                {process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurada'}
                            </code>
                        </div>
                        <div className={styles.configItem}>
                            <strong>Anon Key:</strong>
                            <code className={styles.code}>
                                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                                    ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
                                    : 'No configurada'}
                            </code>
                        </div>
                        {userCount !== null && (
                            <div className={styles.configItem}>
                                <strong>Usuarios en DB:</strong>
                                <code className={styles.code}>{userCount}</code>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botones de acción */}
                {connectionStatus.status === 'connected' && (
                    <div className={styles.actionsSection}>
                        <h3 className={styles.sectionTitle}>🧪 Acciones de Prueba</h3>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={testQuery}
                                className={styles.button}
                            >
                                📊 Consultar Usuarios
                            </button>
                            <button
                                onClick={createTestUser}
                                className={styles.buttonSecondary}
                            >
                                ➕ Crear Usuario de Prueba
                            </button>
                            <button
                                onClick={checkConnection}
                                className={styles.buttonSecondary}
                            >
                                🔄 Refrescar
                            </button>
                        </div>
                    </div>
                )}

                {/* Instrucciones */}
                <div className={styles.instructionsBox}>
                    <h3 className={styles.sectionTitle}>📚 Instrucciones</h3>
                    <ol className={styles.instructionsList}>
                        <li>
                            Verifica que las variables de entorno en <code className={styles.inlineCode}>.env.local</code> estén configuradas correctamente
                        </li>
                        <li>
                            Si ves &quot;tabla no existe&quot;, ejecuta el script SQL en tu proyecto Supabase:
                            <code className={styles.codeBlock}>script9/supabase-scripts.sql</code>
                        </li>
                        <li>
                            Ve a tu proyecto en <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className={styles.link}>Supabase Dashboard</a>
                        </li>
                        <li>
                            Navega a <strong>SQL Editor</strong> y ejecuta el contenido del archivo
                        </li>
                        <li>
                            Refresca esta página para verificar la conexión
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

