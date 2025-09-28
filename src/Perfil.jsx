import React from "react";
import "./CSS/VisualizarPerfil/perfilstyle.css";

function Perfil() {
    const handleVoltar = (e) => {
        e.preventDefault();
        window.location.href = "./home.html";
    };

    return (
        <div className="perfil-container">
            <header className="perfil-header">
                <a href="#" className="voltar" onClick={handleVoltar}>
                    {/* Ícone seta para a esquerda */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <h1>Meu Perfil</h1>
            </header>
            <hr className="divider" />
            <main className="perfil-main">
                <div className="perfil-avatar">
                    {/* Ícone usuário */}
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <ellipse cx="40" cy="28" rx="16" ry="16" fill="#C4C4C4"/>
                        <path d="M40 48c-13.255 0-24 6.268-24 14v2h48v-2c0-7.732-10.745-14-24-14z" fill="#C4C4C4"/>
                    </svg>
                </div>
                <div className="perfil-info">
                    <div className="perfil-campo">
                        <span className="perfil-label">Nome</span>
                        <span className="perfil-valor">Heber Stein Mazutti</span>
                    </div>
                    <div className="perfil-campo">
                        <span className="perfil-label">E-mail</span>
                        <span className="perfil-valor">heber@empresa.com.br</span>
                    </div>
                    <div className="perfil-campo">
                        <span className="perfil-label">Departamento</span>
                        <span className="perfil-valor">Marketing</span>
                    </div>
                    <div className="perfil-campo">
                        <span className="perfil-label">CPF</span>
                        <span className="perfil-valor">123456789-01</span>
                    </div>
                    <div className="perfil-campo perfil-radio">
                        <label>
                            <input type="radio" name="tipo" />
                            <span className="radio-custom checked"></span>
                            Funcionário
                        </label>
                        <label>
                            <input type="radio" name="tipo" defaultChecked />
                            <span className="radio-custom checked"></span>
                            Gestor
                        </label>
                    </div>
                </div>
            </main>
            <nav className="bottom-nav">
                <div className="nav-icon" onClick={() => window.location.href='autoavaliacao.html'}>
                    {/* Novo ícone SVG conforme imagem enviada */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2"/>
                        <path d="M12 17l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="26" cy="8" r="4" fill="none" stroke="#e0e0e0" strokeWidth="2"/>
                        <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className="nav-icon home" onClick={() => window.location.href='./home.html'}>
                    {/* Casa */}
                    <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                </div>
                <div className="nav-icon active">
                    {/* Usuário */}
                    <svg viewBox="0 0 24 24" fill="#5cc6ba"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
                </div>
            </nav>
        </div>
    );
}

export default Perfil;
