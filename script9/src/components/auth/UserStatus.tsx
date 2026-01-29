"use client"; // Marca como componente de cliente
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserStatus() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Cargando...</p>;
    }

    if (session) {
        return (
            <div>
                <p>Bienvenido, {session.user?.name} ({session.user?.role})</p>
                <Button onClick={() => signOut()}>Cerrar Sesión</Button>
            </div>
        );
    }

    return (
        <div>
            <p>No has iniciado sesión.</p>
            <Button onClick={() => signIn()}>Iniciar Sesión</Button>
        </div>
    );
}
