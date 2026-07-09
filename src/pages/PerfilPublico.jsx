import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

    return (
        <div
            className="min-h-screen py-16 px-4"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
            <main className="max-w-lg mx-auto">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    {perfil?.avatar ? (
                        <img
                            src={perfil.avatar}
                            alt={`Avatar de ${perfil.name}`}
                            className="h-24 w-24 object-cover"
                            style={{ border: '2px solid var(--color-accent)' }}
                        />
                    ) : (
                        <div
                            className="h-24 w-24 flex items-center justify-center text-3xl font-bold"
                            style={{
                                backgroundColor: 'var(--color-bg-surface)',
                                border: '2px solid var(--color-accent)',
                                color: 'var(--color-text-muted)',
                            }}
                        >
                            {perfil?.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Nome */}
                <h1
                    className="text-2xl font-bold text-center mb-8"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {perfil?.name}
                </h1>

                {/* Links */}
                <div className="space-y-3">
                    {perfil?.links && perfil.links.length > 0 ? (
                        perfil.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full p-5 text-center font-bold transition-colors hover:border-[var(--color-accent-alt)]"
                                style={{
                                    backgroundColor: 'var(--color-bg-surface)',
                                    border: '1px solid var(--color-border-default)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                {link.titulo}
                            </a>
                        ))
                    ) : (
                        <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {'// nenhum link adicionado'}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {'> devlinks'}
                    </p>
                </div>
            </main>
        </div>
    );
}
