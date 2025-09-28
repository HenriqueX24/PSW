import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Criarconta.css";
import ButtonSubmit from "../../Components/ButtonSubmit";
import SimpleContainer from "../../Components/SimpleContainer";
import Forms from "../../Components/Forms";

function CriarConta() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const navigate = useNavigate();

  // Máscara de CPF
  const handleCpfChange = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9)
      v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    else if (v.length > 6)
      v = v.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    setCpf(v);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !cpf || !email || !senha || !cargo) {
      alert("Preencha todos os campos.");
      return;
    }
    const cpfFormatoOk = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    if (!cpfFormatoOk) {
      alert("CPF inválido. Use o formato 000.000.000-00.");
      return;
    }
    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    localStorage.setItem("nome", nome);
    localStorage.setItem("cpf", cpf);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);
    localStorage.setItem("cargo", cargo);
    navigate("./login.html");
  };

  return (
    <SimpleContainer>
      <h1>Criar conta</h1>
      {/*<form className="login-form" onSubmit={handleSubmit} noValidate></form>
       */}
      {/* */}
      <Forms onSubmit={handleSubmit} noValidate className="login-form">
        <label htmlFor="nome">Nome completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome completo"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          placeholder="CPF"
          inputMode="numeric"
          maxLength={14}
          pattern="^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$"
          required
          value={cpf}
          onChange={handleCpfChange}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          minLength={6}
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 600, marginBottom: 8 }}>Cargo</legend>
          <label htmlFor="cargo-func" style={{ marginRight: 12 }}>
            <input
              type="radio"
              id="cargo-func"
              name="cargo"
              value="funcionario"
              required
              checked={cargo === "funcionario"}
              onChange={() => setCargo("funcionario")}
            />
            Funcionário
          </label>
          <label htmlFor="cargo-gest">
            <input
              type="radio"
              id="cargo-gest"
              name="cargo"
              value="gestor"
              required
              checked={cargo === "gestor"}
              onChange={() => setCargo("gestor")}
            />
            Gestor
          </label>
        </fieldset>
        <ButtonSubmit />
      </Forms>
    </SimpleContainer>
  );
}

export default CriarConta;
