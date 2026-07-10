import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);

        try {
            await api.post('/usuario', { name: nome, email, password });

            toast.success("Conta criada com sucesso! Você já pode fazer login.");
            navigate('/');

        } catch {
            // toast de erro já é exibido pelo interceptor da api.js
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--color-accent)' }}>
                        $ devlinks
                    </h1>
                    <p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        // crie sua conta
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            className="block text-xs font-bold mb-2 tracking-wider uppercase"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            nome
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome"
                            className="w-full px-4 py-3 text-sm border rounded-none transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-primary)',
                                color: 'var(--color-text-primary)',
                            }}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold mb-2 tracking-wider uppercase"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="voce@email.com"
                            className="w-full px-4 py-3 text-sm border rounded-none transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-primary)',
                                color: 'var(--color-text-primary)',
                            }}
                            required
                        />
                    </div>

                    <div>
                        <label
                            className="block text-xs font-bold mb-2 tracking-wider uppercase"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 text-sm border rounded-none transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-primary)',
                                color: 'var(--color-text-primary)',
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full py-3 px-4 text-sm font-bold rounded-none transition-colors mt-6"
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg-primary)',
                            opacity: carregando ? 0.6 : 1,
                            cursor: carregando ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {carregando ? '> Criando conta...' : '> Criar conta'}
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        &gt;{' '}
                        <Link
                            to="/"
                            className="font-bold transition-colors hover:underline"
                            style={{ color: 'var(--color-accent-alt)' }}
                        >
                            já tenho conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
