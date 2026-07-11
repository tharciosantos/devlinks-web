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

    const obterIniciais = (nome) => {
        if (!nome) return '??';
        const partes = nome.trim().split(' ');
        if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
        return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
    };

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
            className="min-h-screen flex flex-col items-center py-16 px-4"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
            <main className="w-full max-w-[320px]">
                {/* Profile */}
                <div className="text-center my-6">
                    {perfil?.avatar ? (
                        <img
                            src={perfil.avatar}
                            alt={`Avatar de ${perfil.name}`}
                            className="w-20 h-20 mx-auto object-cover mb-3"
                            style={{ border: '2px solid var(--color-accent)' }}
                        />
                    ) : (
                        <div
                            className="w-20 h-20 mx-auto flex items-center justify-center text-green-500 font-bold tracking-tighter mb-3"
                            style={{
                                backgroundColor: 'var(--color-bg-surface)',
                                border: '2px solid var(--color-accent)',
                            }}
                        >
                            [{obterIniciais(perfil?.name || username)}]
                        </div>
                    )}
                    <h3 className="text-white font-bold text-base">
                        &lt;{perfil?.name || username}.dev&gt;
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        ~ main $ node --version
                    </p>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--color-accent)' }}>
                        v20.11.0 // Full Stack
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-3 mt-8">
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
                                className="group block p-3 border transition-all flex items-center"
                                style={{
                                    borderColor: 'var(--color-border-default)',
                                    backgroundColor: 'rgba(17, 17, 17, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)';
                                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.3)';
                                    e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                }}
                            >
                                <span
                                    className="mr-2 group-hover:translate-x-1 transition-transform"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    ❯
                                </span>
                                <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>
                                    /{link.titulo?.toLowerCase().replace(/\s+/g, '-') || 'link'}
                                </span>
                                <span className="ml-auto text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                                    [200]
                                </span>
                            </a>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-12 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    <p className="animate-pulse">_ system online</p>
                </div>
            </main>
        </div>
    );
}
