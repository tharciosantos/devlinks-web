import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { SkeletonDashboard } from '../components/SkeletonDashboard';

export function Dashboard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: perfil, isLoading, isError } = useQuery({
        queryKey: ['meu-perfil'],
        queryFn: async () => {
            const { data } = await api.get('/meu-perfil');
            return data;
        },
        retry: false
    });

    const handleLogout = () => {
        localStorage.removeItem('meu_token_vip');
        navigate('/');
    };

    const mutacaoUploadFoto = useMutation({
        mutationFn: async (arquivo) => {
            const formData = new FormData();
            formData.append('foto', arquivo);

            const { data } = await api.patch('/usuario/foto', formData);
            return data;
        },
        onSuccess: (dados) => {
            queryClient.invalidateQueries({ queryKey: ['meu-perfil'] });
            toast.success(dados.message || 'Sua foto foi atualizada!');
        }
    });

    const lidarComEscolhaDeFoto = (evento) => {
        const arquivoSelecionado = evento.target.files[0];
        if (arquivoSelecionado) {
            mutacaoUploadFoto.mutate(arquivoSelecionado);
        }
    };

    const mutacaoAdicionarLink = useMutation({
        mutationFn: async (novoLink) => {
            const { data } = await api.post('/usuario/link', novoLink);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meu-perfil'] });
            toast.success('Link adicionado!');
        }
    });

    const [novoTitulo, setNovoTitulo] = useState('');
    const [novaUrl, setNovaUrl] = useState('');

    const handleAdicionarLink = (e) => {
        e.preventDefault();

        if (!novoTitulo || !novaUrl) {
            return toast.error('Preencha o titulo e a URL!');
        }
        mutacaoAdicionarLink.mutate({ titulo: novoTitulo, url: novaUrl });

        setNovoTitulo('');
        setNovaUrl('');
    };

    const mutacaoDeletarLink = useMutation({
        mutationFn: async (idDoLink) => {
            const { data } = await api.delete(`/usuario/link/${idDoLink}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meu-perfil'] });
            toast.success('Link excluido com sucesso!');
        }
    });

    const idDoUsuarioLogado = perfil?._id || perfil?._id;

    const meuLinkPublico = idDoUsuarioLogado ? `${window.location.origin}/p/${idDoUsuarioLogado}` : '';

    const copiarLink = async () => {
        try {
            await navigator.clipboard.writeText(meuLinkPublico);
            toast.success('Link copiado para a area de transferencia!', { id: 'copiar-link' });
        } catch (err) {
            console.error('Erro ao copiar o link: ', err);
            toast.error('Nao foi possivel copiar o link.', { id: 'copiar-link' });
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            {/* Nav */}
            <nav style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)' }}>
                <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
                    <span className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
                        $ devlinks
                    </span>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                        <label
                            className={`cursor-pointer text-xs px-3 py-2 border rounded-none transition-colors ${
                                mutacaoUploadFoto.isPending
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:border-[var(--color-accent-alt)]'
                            }`}
                            style={{
                                color: 'var(--color-text-secondary)',
                                borderColor: 'var(--color-border-default)',
                            }}
                        >
                            {mutacaoUploadFoto.isPending ? '// enviando...' : '> mudar foto'}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={lidarComEscolhaDeFoto}
                                disabled={mutacaoUploadFoto.isPending}
                            />
                        </label>

                        <button
                            onClick={handleLogout}
                            className="text-xs px-3 py-2 border rounded-none transition-colors hover:border-[var(--color-error)]"
                            style={{
                                color: 'var(--color-error)',
                                borderColor: 'var(--color-border-default)',
                            }}
                        >
                            {'>'} sair
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main */}
            <main className="max-w-xl mx-auto py-6 sm:py-12 px-4">

                {isLoading && <SkeletonDashboard />}

                {isError && (
                    <div className="text-center py-16">
                        <p className="text-sm mb-4" style={{ color: 'var(--color-error)' }}>
                            {'// erro: nao foi possivel carregar seu perfil'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-sm transition-colors hover:underline"
                            style={{ color: 'var(--color-accent-alt)' }}
                        >
                            {'>'} tentar novamente
                        </button>
                    </div>
                )}

                {!isLoading && !isError && perfil && (
                    <>
                        {/* Link Publico */}
                        <div
                            className="p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                            style={{
                                backgroundColor: 'var(--color-bg-surface)',
                                border: '1px solid var(--color-accent)',
                            }}
                        >
                            <p className="text-xs text-center sm:text-left" style={{ color: 'var(--color-text-secondary)' }}>
                                {'> perfil publico:'}
                                <br />
                                <a
                                    href={meuLinkPublico}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold break-all transition-colors hover:underline"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    {meuLinkPublico}
                                </a>
                            </p>
                            <button
                                onClick={copiarLink}
                                className="text-xs font-bold px-4 py-2 rounded-none transition-colors w-full sm:w-auto shrink-0"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'var(--color-bg-primary)',
                                }}
                            >
                                {'>'} copiar
                            </button>
                        </div>

                        {/* Perfil */}
                        <div
                            className="p-4 sm:p-6 mb-8"
                            style={{
                                backgroundColor: 'var(--color-bg-surface)',
                                border: '1px solid var(--color-border-default)',
                            }}
                        >
                            {/* Avatar */}
                            <div className="flex justify-center mb-6">
                                {perfil.avatar ? (
                                    <img
                                        src={perfil.avatar}
                                        alt={`Avatar de ${perfil.name}`}
                                        className="h-20 w-20 object-cover"
                                        style={{ border: '2px solid var(--color-accent)' }}
                                    />
                                ) : (
                                    <div
                                        className="h-20 w-20 flex items-center justify-center text-2xl font-bold"
                                        style={{
                                            backgroundColor: 'var(--color-bg-elevated)',
                                            border: '2px solid var(--color-accent)',
                                            color: 'var(--color-text-muted)',
                                        }}
                                    >
                                        {perfil.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {perfil.name}
                                </h2>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    {perfil.email}
                                </p>
                            </div>

                            {/* Form Adicionar Link */}
                            <form onSubmit={handleAdicionarLink} className="space-y-3">
                                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                                    {'// adicionar link'}
                                </p>
                                <input
                                    type="text"
                                    placeholder="titulo (ex: Meu GitHub)"
                                    value={novoTitulo}
                                    onChange={(e) => setNovoTitulo(e.target.value)}
                                    className="w-full px-4 py-3 text-sm border rounded-none transition-colors"
                                    style={{
                                        backgroundColor: 'var(--color-bg-primary)',
                                        color: 'var(--color-text-primary)',
                                    }}
                                />
                                <input
                                    type="url"
                                    placeholder="url (ex: https://github.com/user)"
                                    value={novaUrl}
                                    onChange={(e) => setNovaUrl(e.target.value)}
                                    className="w-full px-4 py-3 text-sm border rounded-none transition-colors"
                                    style={{
                                        backgroundColor: 'var(--color-bg-primary)',
                                        color: 'var(--color-text-primary)',
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={mutacaoAdicionarLink.isPending}
                                    className="w-full py-3 text-sm font-bold rounded-none transition-colors disabled:opacity-50"
                                    style={{
                                        backgroundColor: 'var(--color-accent)',
                                        color: 'var(--color-bg-primary)',
                                    }}
                                >
                                    {mutacaoAdicionarLink.isPending ? '// adicionando...' : '+ adicionar'}
                                </button>
                            </form>
                        </div>

                        {/* Lista de Links */}
                        <div>
                            <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                {'// seus links'}
                            </p>

                            <div className="space-y-2">
                                {perfil.links.map((link, index) => (
                                    <div
                                        key={link._id || index}
                                        className="flex items-center gap-2 p-3 sm:p-4 border transition-all duration-150"
                                        style={{
                                            backgroundColor: 'var(--color-bg-surface)',
                                            borderColor: 'var(--color-border-default)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                        }}
                                    >
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-sm font-bold transition-colors hover:underline"
                                            style={{ color: 'var(--color-text-primary)' }}
                                        >
                                            {link.titulo}
                                        </a>

                                        <button
                                            onClick={() => {
                                                const idParaDeletar = link._id || link._id;
                                                if (window.confirm("Tem certeza que deseja excluir este link?")) {
                                                    mutacaoDeletarLink.mutate(idParaDeletar);
                                                }
                                            }}
                                            disabled={mutacaoDeletarLink.isPending}
                                            className="text-xs px-2 py-1 transition-colors hover:opacity-75 disabled:opacity-50"
                                            style={{ color: 'var(--color-error)' }}
                                            title="Excluir link"
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
