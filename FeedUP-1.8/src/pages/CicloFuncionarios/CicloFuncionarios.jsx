import React from "react";
import "./ciclo-funcionarios.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CicloFuncionarios() {
  const navigate = useNavigate();
  const { _ } = useParams(); // _ vindo de /ciclo-funcionarios/:id (ex.: 1)

  // Mock de funcionários do ciclo (coloque os IDs reais das avaliações se tiver)
  const employees = [
    {
      name: "Ana Souza",
      email: "ana.souza@email.com",
      dept: "Marketing",
      status: "realizado",
      avaliacaoId: 101, // /avaliacao/101
    },
    {
      name: "Carlos Lima",
      email: "carlos.lima@email.com",
      dept: "RH",
      status: "pendente",
      avaliacaoId: null, // sem avaliação ainda
    },
    {
      name: "Juliana Alves",
      email: "juliana.alves@email.com",
      dept: "TI",
      status: "realizado",
      avaliacaoId: 102,
    },
    {
      name: "Pedro Martins",
      email: "pedro.martins@email.com",
      dept: "Financeiro",
      status: "pendente",
      avaliacaoId: null,
    },
  ];

  return (
    <>
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
        <h1>Funcionários</h1>
      </header>

      <main>
        <section className="employee-list">
          {employees.map((emp, idx) => (
            <div key={idx} className="employee-card">
              <div className="employee-info">
                <span className="employee-name">{emp.name}</span>
                <span className="employee-email">{emp.email}</span>
                <span className="employee-dept">Departamento: {emp.dept}</span>
              </div>

              {emp.status === "realizado" ? (
                <div className="employee-actions">
                  <span className="status-label realizado">
                    Avaliação realizada
                  </span>
                  <button
                    type="button"
                    className="ver-avaliacao-btn"
                    onClick={() => navigate(`/avaliacao/${emp.avaliacaoId}`)}
                  >
                    Ver Avaliação
                  </button>
                </div>
              ) : (
                <span className="status-label pendente">
                  Avaliação pendente
                </span>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <button
          type="button"
          className="nav-icon btn-plain active"
          onClick={() => navigate("/auto-avaliacao/1")} // troque pelo id real se precisar
          aria-label="Autoavaliação"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect
              x="6"
              y="6"
              width="20"
              height="20"
              rx="4"
              fill="#fff"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M12 17l4 4 6-8"
              stroke="#bdbdbd"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="26"
              cy="8"
              r="4"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="2"
            />
            <path
              d="M28.5 5.5a4 4 0 0 1 0 5.66"
              stroke="#e0e0e0"
              strokeWidth="2"
              strokeLinecap="round"
            />
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
    </>
  );
}
