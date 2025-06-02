import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

function AdicionarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !tipo) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      const response = await axios.post('http://localhost:3000/api/usuarios', {
        nome,
        email,
        senha: senhaCriptografada,
        tipo,
      });
      console.log(response.data);
      setNome('');
      setEmail('');
      setSenha('');
      setTipo('');
      setError('');
    } catch (err) {
      setError('Erro ao cadastrar usuário');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Cadastrar Usuário</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          E-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione o tipo de usuário</option>
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="FORNECEDOR">Fornecedor</option>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AdicionarUsuario;