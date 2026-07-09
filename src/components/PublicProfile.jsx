import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export function PublicProfile() {

    const { username } = useParams();
    const [links, setLinks] = useState([]);
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
                setLinks(data.links || []);
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
                            @{username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Username */}
                <h1
                    className="text-2xl font-bold text-center mb-8"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    @{username}
                </h1>

                {/* Links */}
                <div className="space-y-3">
                    {links.length === 0 ? (
                        <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {'// nenhum link adicionado'}
                        </p>
                    ) : (
                        links.map(link => (
                            <a
                                key={link._id || link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full p-5 text-center font-bold border transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                style={{
                                    backgroundColor: 'var(--color-bg-surface)',
                                    borderColor: 'var(--color-border-default)',
                                    color: 'var(--color-text-primary)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                                    e.currentTarget.style.color = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                }}
                            >
                                {link.titulo}
                            </a>
                        ))
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
