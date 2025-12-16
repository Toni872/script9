export default function DetalleEspacio() {
    return (
        <main className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-primary">Detalle del Espacio</h1>
            <p className="text-lg mb-8 text-center text-gray-700">
                Aquí encontrarás toda la información sobre el espacio seleccionado.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-secondary mb-4">Descripción</h2>
                <p className="text-gray-600 mb-4">
                    Este espacio cuenta con todas las comodidades que necesitas para tu evento o estancia.
                </p>
                <h2 className="text-2xl font-semibold text-secondary mb-4">Precios</h2>
                <p className="text-gray-600 mb-4">Desde 100€/hora.</p>
                <h2 className="text-2xl font-semibold text-secondary mb-4">Disponibilidad</h2>
                <p className="text-gray-600">Consulta el calendario para verificar fechas disponibles.</p>
            </div>
        </main>
    );
}
