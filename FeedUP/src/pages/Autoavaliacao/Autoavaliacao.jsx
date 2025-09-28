import React, { useState } from "react";
import "./autoavaliacao.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleContainer from "../../Components/SimpleContainer";
import ButtonSubmit from "../../Components/ButtonSubmit";
import NavBar from "../../Components/NavBar";

function Autoavaliacao() {
  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [email, setEmail] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState(3);
  const [q4, setQ4] = useState(3);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const handleVoltar = (e) => {
    e.preventDefault();
    // navigate(-1); // se preferir voltar na pilha
    navigate("/home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !departamento || !email || !q1 || !q2) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    alert("Autoavaliação enviada com sucesso!");
    navigate("/home"); // volta pra Home sem recarregar
  };

  return (
    // Fragmento do React para permitir dois elementos de nível superior (Container e Nav)
    <>
      <header className="autoavaliacao-header">
        <button
          type="button"
          className="voltar"
          aria-label="Voltar"
          onClick={handleVoltar}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#5cc6ba"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>Autoavaliação</h1>
      </header>

      <main>
        <form className="autoavaliacao-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                required
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <input
                id="departamento"
                required
                placeholder="Digite seu departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Performance Review</h2>

            <div className="form-group">
              <label>
                1. Como você avalia sua capacidade de cumprir prazos?
              </label>
              <div className="radio-group">
                {["excelente", "bom", "regular", "precisa melhorar"].map(
                  (v) => (
                    <label key={v}>
                      <input
                        type="radio"
                        name="q1"
                        value={v}
                        required
                        checked={q1 === v}
                        onChange={(e) => setQ1(e.target.value)}
                      />{" "}
                      {v[0].toUpperCase() + v.slice(1)}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="form-group">
              <label>2. Como você avalia sua comunicação com a equipe?</label>
              <div className="radio-group">
                {["excelente", "bom", "regular", "precisa melhorar"].map(
                  (v) => (
                    <label key={v}>
                      <input
                        type="radio"
                        name="q2"
                        value={v}
                        required
                        checked={q2 === v}
                        onChange={(e) => setQ2(e.target.value)}
                      />{" "}
                      {v[0].toUpperCase() + v.slice(1)}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="q3">3. Nível de proatividade</label>
              <div className="slider-group">
                <input
                  id="q3"
                  type="range"
                  min="1"
                  max="5"
                  value={q3}
                  onChange={(e) => setQ3(Number(e.target.value))}
                />
                <span className="slider-value">{q3}</span>
              </div>
              <div className="slider-labels">
                <span>Baixo</span>
                <span className="max1">Alto</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="q4">
                4. Satisfação com o ambiente de trabalho
              </label>
              <div className="slider-group">
                <input
                  id="q4"
                  type="range"
                  min="1"
                  max="5"
                  value={q4}
                  onChange={(e) => setQ4(Number(e.target.value))}
                />
                <span className="slider-value">{q4}</span>
              </div>
              <div className="slider-labels">
                <span>Insatisfeito</span>
                <span className="max2">Muito satisfeito</span>
              </div>
            </div>
          </div>
          <ButtonSubmit />
        </form>
      </main>

      {/* Bottom nav SPA: elemento irmao do SimpleContainer */}
      <NavBar sx={{}}/>
    </>
  );
}

export default Autoavaliacao;
