import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Enviando login:', { email, senha });

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        senha,
      });

      console.log('Resposta do backend:', response.data);

      // Armazenando o token no localStorage
      localStorage.setItem('token', response.data.token);

      // Direcionando para a tela paginaInicial-usuario.jsx
      navigate('/pagina-inicial-usuario');
    } catch (err) {
      console.error('Erro na requisição:', err.response?.data || err.message);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        const usuarioExiste = await axios.get(`http://localhost:3000/api/usuarios/${email}`);
        if (usuarioExiste.data) {
          if (usuarioExiste.data.senha !== senha) {
            setError('Senha incorreta');
            setShowForgotPassword(true); // Ativa o estado showForgotPassword
          } else {
            setError('E-mail ou senha inválidos');
          }
        } else {
          setError('Usuário não encontrado');
        }
      } else {
        setError('Erro desconhecido');
      }
      if (error === 'Senha incorreta') {
        setShowForgotPassword(true); // Ativa o estado showForgotPassword
      }
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
          <button onClick={() => navigate('/adicionar-usuario')}>Adicionar Usuário</button>
          {showForgotPassword && (
            <button onClick={() => navigate('/recuperar-senha')}>Esqueci minha senha</button>
          )}
        </form>
        <div className="botao-externo">
          <button onClick={() => navigate('/pagina-inicial-fornecedor')}>Acesso Fornecedor</button>
          <button onClick={() => navigate('/pagina-inicial-usuario')}>Acesso Usuário</button>
        </div>
      </div>
    </div>
  );
}

export default Login;