// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        senha,
      });

      const { token, tipo, nome, fornecedor } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('nome', nome);
      localStorage.setItem('tipo', tipo);
      localStorage.setItem('email', email);

      if (fornecedor) {
        localStorage.setItem('fornecedor_id', fornecedor.id);
        localStorage.setItem('fornecedor_nome', fornecedor.nome);
      }

      if (tipo === 'FORNECEDOR') {
        navigate('/pagina-inicial-fornecedor');
      } else {
        localStorage.removeItem('fornecedor_id');
        localStorage.removeItem('fornecedor_nome');
        navigate('/pagina-inicial-usuario');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        if (err.response.data.error === 'Senha incorreta') {
          setShowForgotPassword(true);
        }
      } else {
        setError('Erro ao realizar login');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Sistema de Agendamentos</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
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
          <button type="submit" className="btn-login">Entrar</button>
        </form>

        <div className="login-links">
          {showForgotPassword && (
            <button className="link-button" onClick={() => navigate('/recuperar-senha')}>
              Esqueceu a senha?
            </button>
          )}
          <button className="link-button" onClick={() => navigate('/adicionar-usuario')}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
