'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('🔥 Global React Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border-0 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-emerald-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ups, algo salió mal
        </h2>

        <p className="text-gray-500 mb-8">
          Hemos detectado un error inesperado. No te preocupes, nuestro equipo ha sido notificado automáticamente.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={reset}
            className="w-full bg-[#003D82] hover:bg-[#002E5C] text-white font-semibold h-12"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full border-gray-200 text-gray-700 h-12">
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-left bg-gray-100 p-4 rounded-lg overflow-auto max-h-48 text-xs font-mono text-emerald-600">
            {error.message}
          </div>
        )}
      </Card>
    </div>
  );
}
