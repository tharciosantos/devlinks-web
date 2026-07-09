import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('/login', { email, password });

            localStorage.setItem('meu_token_vip', data.token);
            toast.success("Login realizado com sucesso!");
            navigate('/dashboard');

        } catch (error) {
            console.error("Erro capturado no componente:", error);
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
                        // acesse seu painel
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                        className="w-full py-3 px-4 text-sm font-bold rounded-none transition-colors mt-6"
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-bg-primary)',
                        }}
                    >
                        &gt; Entrar
                    </button>
                </form>

                <div className="text-center pt-4">
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        &gt;{' '}
                        <Link
                            to="/cadastro"
                            className="font-bold transition-colors hover:underline"
                            style={{ color: 'var(--color-accent-alt)' }}
                        >
                            criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
