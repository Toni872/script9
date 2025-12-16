export default function Reserva() {
    return (
        <main className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-primary">Proceso de Reserva</h1>
            <p className="text-lg mb-8 text-center text-gray-700">
                Selecciona las fechas y horarios para tu reserva.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-secondary mb-4">Calendario</h2>
                <p className="text-gray-600 mb-4">
                    Aquí se mostrará un calendario interactivo para seleccionar las fechas.
                </p>
                <h2 className="text-2xl font-semibold text-secondary mb-4">Pago</h2>
                <p className="text-gray-600">
                    Completa el proceso de pago para confirmar tu reserva.
                </p>
            </div>
        </main>
    );
}
