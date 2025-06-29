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
  setError('');

  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      senha,
    });

    const { token, tipo, nome, fornecedor } = response.data;

    // Armazenar os dados no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    localStorage.setItem('tipo', tipo);

    if (fornecedor) {
      localStorage.setItem('fornecedor_id', fornecedor.id);    // <-- usa fornecedor.id
      localStorage.setItem('fornecedor_nome', fornecedor.nome); // <-- usa fornecedor.nome
    }

    // Redirecionar conforme o tipo
    if (tipo === 'FORNECEDOR') {
      navigate('/pagina-inicial-fornecedor');
    } else {
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
          <button type="button" onClick={() => navigate('/adicionar-usuario')}>Adicionar Usuário</button>
          {showForgotPassword && (
            <button type="button" onClick={() => navigate('/recuperar-senha')}>Esqueci minha senha</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
