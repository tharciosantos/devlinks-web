import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { PerfilPublicoView } from './PerfilPublicoView';

export function PublicProfile() {
    const { username } = useParams();
    const [perfil, setPerfil] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        const buscarLinksDoUsuario = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/p/${username}`);
                if (!response.ok) {
                    throw new Error('Usuario nao encontrado');
                }

                const data = await response.json();
                setPerfil(data);
            } catch (error) {
                console.error("Erro ao buscar links:", error);
                setErro(true);
            } finally {
                setCarregando(false);
            }
        };

        buscarLinksDoUsuario();
    }, [username]);

    if (carregando) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-primary)' }}
            >
                <p className="text-sm animate-pulse" style={{ color: 'var(--color-accent)' }}>
                    {'> carregando perfil...'}
                </p>
            </div>
        );
    }

    if (erro) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-primary)' }}
            >
                <p className="text-sm font-bold" style={{ color: 'var(--color-error)' }}>
                    {'// perfil nao encontrado'}
                </p>
            </div>
        );
    }

    return <PerfilPublicoView perfil={perfil} nomeFallback={username} />;
}
