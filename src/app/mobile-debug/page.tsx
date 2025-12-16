'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function MobileDebug() {
    const { data: session, status } = useSession();
    const [cookies, setCookies] = useState<string>('');
    const [userAgent, setUserAgent] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        // Capturar información del navegador
        setCookies(document.cookie);
        setUserAgent(navigator.userAgent);

        // Interceptar logs de consola
        const originalLog = console.log;
        const originalError = console.error;

        console.log = (...args) => {
            setLogs(prev => [...prev, `LOG: ${JSON.stringify(args)}`]);
            originalLog(...args);
        };

        console.error = (...args) => {
            setLogs(prev => [...prev, `ERROR: ${JSON.stringify(args)}`]);
            originalError(...args);
        };

        return () => {
            console.log = originalLog;
            console.error = originalError;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">🔍 Diagnóstico Móvil</h1>

                {/* Estado de Sesión */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Estado de Sesión</h2>
                    <div className="space-y-2 text-sm">
                        <p><strong>Status:</strong> <span className={status === 'authenticated' ? 'text-green-600' : 'text-red-600'}>{status}</span></p>
                        {session && (
                            <>
                                <p><strong>Email:</strong> {session.user?.email}</p>
                                <p><strong>Nombre:</strong> {session.user?.name}</p>
                                <p><strong>ID:</strong> {session.user?.id}</p>
                                <p><strong>Role:</strong> {session.user?.role}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Cookies */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Cookies</h2>
                    <div className="text-xs overflow-x-auto bg-gray-100 p-2 rounded">
                        <pre>{cookies || 'No hay cookies'}</pre>
                    </div>
                </div>

                {/* User Agent */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">User Agent</h2>
                    <div className="text-xs overflow-x-auto bg-gray-100 p-2 rounded">
                        <pre>{userAgent}</pre>
                    </div>
                </div>

                {/* Environment */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Environment Info</h2>
                    <div className="space-y-1 text-sm">
                        <p><strong>Window Origin:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
                        <p><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</p>
                        <p><strong>Protocol:</strong> {typeof window !== 'undefined' ? window.location.protocol : 'N/A'}</p>
                        <p><strong>Port:</strong> {typeof window !== 'undefined' ? window.location.port || 'default' : 'N/A'}</p>
                    </div>
                </div>

                {/* Logs */}
                <div className="bg-white rounded-lg p-4 shadow">
                    <h2 className="text-lg font-semibold mb-2">Console Logs (últimos 50)</h2>
                    <div className="text-xs overflow-x-auto bg-gray-100 p-2 rounded max-h-96 overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No hay logs aún</p>
                        ) : (
                            <pre>{logs.slice(-50).join('\n')}</pre>
                        )}
                    </div>
                    <button
                        onClick={() => setLogs([])}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                        Limpiar Logs
                    </button>
                </div>
            </div>
        </div>
    );
}


