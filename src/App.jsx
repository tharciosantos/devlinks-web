import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Cadastro } from './pages/Cadastro';
import { RotaPrivada } from './components/RotaPrivada';
import { PublicProfile } from './components/PublicProfile';
import { Toaster } from 'react-hot-toast';
import { PerfilPublico } from './pages/PerfilPublico';

export function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-bg-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-default)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            borderRadius: '0px',
            boxShadow: 'none',
          },
          success: {
            style: {
              borderLeft: '3px solid var(--color-accent)',
            },
          },
          error: {
            style: {
              borderLeft: '3px solid var(--color-error)',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/p/:id" element={<PerfilPublico />} />
        <Route path="/p/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;