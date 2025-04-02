// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    console.log('Enviando login:', { email, senha });
  
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3000/api/auth/login', 
        { email, senha }, 
        { headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
      } 
      });
      console.log('Resposta do backend:', response.data);
  
      // Armazenando o token no localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login realizado com sucesso!');
    } catch (err) {
      console.error('Erro na requisição:', err.response?.data || err.message);
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
