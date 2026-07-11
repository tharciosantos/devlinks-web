import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PerfilPublicoView } from '../components/PerfilPublicoView';

export function PerfilPublico() {
    const { id } = useParams();

    const { data: perfil, isLoading, isError } = useQuery({
        queryKey: ['perfil-publico', id],
        queryFn: async () => {
            const resposta = await fetch(`${import.meta.env.VITE_API_URL}/p/${id}`);
            if (!resposta.ok) throw new Error('Perfil nao encontrado');
            return resposta.json();
        },
        retry: false
    });

    if (isLoading) {
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

    if (isError) {
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

    return <PerfilPublicoView perfil={perfil} />;
}
