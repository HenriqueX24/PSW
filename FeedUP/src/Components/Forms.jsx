import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import styles from './Forms.module.css';
import ControlledRadioButtonsGroup from './ControlledRadioButtonsGroup';
import ButtonSubmit from './ButtonSubmit';
import { addUser } from '../features/user/usersSlice';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
export default function Forms() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("funcionario");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const newUser = { id: Date.now(), nome, cpf, email, senha, cargo };
    dispatch(addUser(newUser));
    alert("Conta criada com sucesso!");
    navigate("/login");
  };

return (
  <form onSubmit={handleSubmit} className={styles.loginForm}>

    {/* -- CAMPO NOME -- */}
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="nome-input" style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
        Nome completo
      </label>
      <Input id="nome-input" value={nome} onChange={(e) => setNome(e.target.value)} /> 
    </div>

    {/* -- CAMPO CPF -- */}
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="cpf-input" style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
        CPF
      </label>
      <Input id="cpf-input" value={cpf} onChange={handleCpfChange} />
    </div>

    {/* -- CAMPO E-MAIL -- */}
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="email-input" style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
        E-mail
      </label>
      <Input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    {/* -- CAMPO SENHA -- */}
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="senha-input" style={{ fontWeight: 600, color: '#333', marginBottom: '4px' }}>
        Senha
      </label>
      <Input id="senha-input" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
    </div>

  <FormControl component="fieldset" style={{ marginTop: '20px' }}>
      <FormLabel component="legend" style={{ fontWeight: 600, color: '#333' }}>
        Perfil
      </FormLabel>
      <RadioGroup
        row  // A propriedade 'row' deixa os botões lado a lado
        aria-labelledby="perfil-radio-buttons-group"
        name="perfil-radio-buttons-group"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
      >
        <FormControlLabel value="funcionario" control={<Radio />} label="Funcionário" />
        <FormControlLabel value="gestor" control={<Radio />} label="Gestor" />
      </RadioGroup>
    </FormControl>
    
    <ButtonSubmit />

  </form>
);
}