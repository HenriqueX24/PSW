import React, { useState } from "react";
import "./CSS/Autoavaliacao/autoavaliacao.css";

function Autoavaliacao() {
  const [nome, setNome] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [email, setEmail] = useState("");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState(3);
  const [q4, setQ4] = useState(3);

  const goTo = (url) => { window.location.href = url; };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !departamento || !email || !q1 || !q2) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    alert("Autoavaliação enviada com sucesso!");
    goTo("./home.html");
  };

  return (
    <div className="autoavaliacao-container">
      <header className="autoavaliacao-header">
        <a href="#" className="voltar" aria-label="Voltar" onClick={e => { e.preventDefault(); goTo("./home.html"); }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#5cc6ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <h1>Autoavaliação</h1>
      </header>
      <main>
        <form className="autoavaliacao-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                placeholder="Digite seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <input
                type="text"
                id="departamento"
                name="departamento"
                required
                placeholder="Digite seu departamento"
                value={departamento}
                onChange={e => setDepartamento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Digite seu e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Performance Review</h2>
            <div className="form-group">
              <label>1. Como você avalia sua capacidade de cumprir prazos?</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="q1" value="excelente" required checked={q1 === "excelente"} onChange={e => setQ1(e.target.value)} /> Excelente
                </label>
                <label>
                  <input type="radio" name="q1" value="bom" checked={q1 === "bom"} onChange={e => setQ1(e.target.value)} /> Bom
                </label>
                <label>
                  <input type="radio" name="q1" value="regular" checked={q1 === "regular"} onChange={e => setQ1(e.target.value)} /> Regular
                </label>
                <label>
                  <input type="radio" name="q1" value="precisa melhorar" checked={q1 === "precisa melhorar"} onChange={e => setQ1(e.target.value)} /> Precisa melhorar
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>2. Como você avalia sua comunicação com a equipe?</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="q2" value="excelente" required checked={q2 === "excelente"} onChange={e => setQ2(e.target.value)} /> Excelente
                </label>
                <label>
                  <input type="radio" name="q2" value="bom" checked={q2 === "bom"} onChange={e => setQ2(e.target.value)} /> Bom
                </label>
                <label>
                  <input type="radio" name="q2" value="regular" checked={q2 === "regular"} onChange={e => setQ2(e.target.value)} /> Regular
                </label>
                <label>
                  <input type="radio" name="q2" value="precisa melhorar" checked={q2 === "precisa melhorar"} onChange={e => setQ2(e.target.value)} /> Precisa melhorar
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="q3">3. Nível de proatividade</label>
              <div className="slider-group">
                <input
                  type="range"
                  id="q3"
                  name="q3"
                  min="1"
                  max="5"
                  value={q3}
                  onChange={e => setQ3(Number(e.target.value))}
                />
                <span className="slider-value">{q3}</span>
              </div>
              <div className="slider-labels">
                <span>Baixo</span>
                <span className="max1">Alto</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="q4">4. Satisfação com o ambiente de trabalho</label>
              <div className="slider-group">
                <input
                  type="range"
                  id="q4"
                  name="q4"
                  min="1"
                  max="5"
                  value={q4}
                  onChange={e => setQ4(Number(e.target.value))}
                />
                <span className="slider-value">{q4}</span>
              </div>
              <div className="slider-labels">
                <span>Insatisfeito</span>
                <span className="max2">Muito satisfeito</span>
              </div>
            </div>
          </div>
          <button type="submit" className="main-btn">Enviar</button>
        </form>
      </main>
      <nav className="bottom-nav">
        <div className="nav-icon active">
          {/* Ícone Avaliação */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g opacity="0.5">
              <rect x="4" y="6" width="20" height="20" rx="6" fill="#fff" stroke="#bdbdbd" strokeWidth="2"/>
              <path d="M11 18l4 4 6-8" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="26" cy="8" r="4" fill="none" stroke="#bdbdbd" strokeWidth="2"/>
              <path d="M28.5 5.5a4 4 0 0 1 0 5.66" stroke="#bdbdbd" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        </div>
        <div className="nav-icon home" onClick={() => goTo("home.html")}>
          {/* Casa */}
          <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
        <div className="nav-icon" onClick={() => goTo("perfil.html")}>
          {/* Usuário */}
          <svg viewBox="0 0 24 24" fill="#e0e0e0"><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
        </div>
      </nav>
    </div>
  );
}

export default Autoavaliacao;
