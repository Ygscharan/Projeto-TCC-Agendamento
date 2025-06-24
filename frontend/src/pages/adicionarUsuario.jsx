import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import '../adicionarUsuario.css';

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
      
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        senha,
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
    <div className="container">
      <header className="header">
        <h1 className="titulo">Adicionar Usuário</h1>
      </header>
      <main className="main">
        <section className="secao-1">
          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label>Nome:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="campo">
              <label>E-mail:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="campo">
              <label>Senha:</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <div className="campo">
              <label>Tipo:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione o tipo de usuário</option>
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="FORNECEDOR">Fornecedor</option>
              </select>
            </div>
            <button type="submit" className="botao">Cadastrar</button>
            {error && <div className="error">{error}</div>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdicionarUsuario;