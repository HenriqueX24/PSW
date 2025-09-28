// src/CriarCiclo.jsx
import React, { useState } from "react";
import "./CSS/CriaCicloRevisao/criar-ciclo.css";
import { useNavigate } from "react-router-dom";

export default function CriarCiclo() {
  const [periodo, setPeriodo] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);

  const navigate = useNavigate();

  const handleFuncionarioChange = (email) => {
    setFuncionarios((prev) =>
      prev.includes(email) ? prev.filter((f) => f !== email) : [...prev, email]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!periodo || !avaliacao || funcionarios.length === 0) {
      alert("Preencha todos os campos.");
      return;
    }
    alert("Ciclo salvo com sucesso!");
    navigate("/ciclo-revisao");
  };

  return (
    <div className="container">
      <header className="header">
        <button
          type="button"
          className="back-btn"
          aria-label="Voltar"
          onClick={() => navigate("/ciclo-revisao")}
        >
          <svg width="24" height="24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#7ED6C0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>Criar Ciclo de Revisão</h1>
      </header>

      <main>
        <form className="ciclo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="periodo">Período</label>
            <select
              id="periodo"
              name="periodo"
              required
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="avaliacao">Avaliação</label>
            <div className="avaliacao-cards">
              <label className="avaliacao-card">
                <input
                  type="radio"
                  name="avaliacao"
                  value="avaliacao360"
                  required
                  checked={avaliacao === "avaliacao360"}
                  onChange={() => setAvaliacao("avaliacao360")}
                />
                <div>
                  <span className="avaliacao-title">Avaliação 360</span>
                  <span className="avaliacao-desc">18/08/2025</span>
                </div>
              </label>

              <label className="avaliacao-card">
                <input
                  type="radio"
                  name="avaliacao"
                  value="avaliacaoPCH"
                  checked={avaliacao === "avaliacaoPCH"}
                  onChange={() => setAvaliacao("avaliacaoPCH")}
                />
                <div>
                  <span className="avaliacao-title">Avaliação PCH</span>
                  <span className="avaliacao-desc">18/06/2025</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Funcionários</label>
            <div className="funcionarios-cards">
              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="ana.souza@email.com"
                  checked={funcionarios.includes("ana.souza@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("ana.souza@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Ana Souza</span>
                  <span className="funcionario-depto">Vendas</span>
                </div>
              </label>

              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="carlos.lima@email.com"
                  checked={funcionarios.includes("carlos.lima@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("carlos.lima@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Carlos Lima</span>
                  <span className="funcionario-depto">RH</span>
                </div>
              </label>

              <label className="funcionario-card">
                <input
                  type="checkbox"
                  value="juliana.alves@email.com"
                  checked={funcionarios.includes("juliana.alves@email.com")}
                  onChange={() =>
                    handleFuncionarioChange("juliana.alves@email.com")
                  }
                />
                <div>
                  <span className="funcionario-nome">Juliana Alves</span>
                  <span className="funcionario-depto">TI</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="main-btn">
            Salvar Ciclo
          </button>
        </form>
      </main>

      <nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")}
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
            <path d="M12 17l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="26" cy="8" r="4" fill="none" stroke="#e0e0e0" strokeWidth="2" />
            <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-icon btn-plain home"
          onClick={() => navigate("/home")}
          aria-label="Home"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#5cc6ba">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-icon btn-plain"
          onClick={() => navigate("/perfil")}
          aria-label="Perfil"
        >
          <svg viewBox="0 0 24 24" width="32" height="32" fill="#e0e0e0">
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
