'use client';

import { OrderList } from '@/components/dashboard/OrderList';

export default function PedidosPage() {
    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <h2 className="text-2xl font-bold text-[#333333]">Mis Proyectos</h2>
            <OrderList />
        </div>
    );
}
