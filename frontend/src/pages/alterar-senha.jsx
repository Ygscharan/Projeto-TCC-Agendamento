import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PaginaInicialUsuario.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Api from '../services/Api';

function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setError('Preencha todos os campos.');
      return;
    }
    if (novaSenha.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!email) {
      setError('Email do usuário não encontrado. Faça login novamente.');
      return;
    }
    try {
      await Api.post('/api/auth/alterar-senha', {
        email,
        senhaAtual,
        novaSenha
      });
      setSuccess('Senha alterada com sucesso!');
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao alterar senha.');
    }
  };

  return (
    <div className="pagina-container" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div className="top-bar">
          <div className="navegacao-btns">
            <button onClick={() => navigate(-1)} className="voltar-btn">
              <ArrowLeft size={20} />
              <span className="texto-voltar">Voltar</span>
            </button>
            <button onClick={() => navigate(1)} className="avancar-btn">
              <span className="texto-avancar">Avançar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="pagina-card" style={{maxWidth: 400, width: '100%'}}>
        <h2 className="pagina-subtitulo">Alterar Senha</h2>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <input
            className="botao"
            type="password"
            placeholder="Senha atual"
            value={senhaAtual}
            onChange={e => setSenhaAtual(e.target.value)}
            style={{marginBottom: 8}}
          />
          <input
            className="botao"
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={e => setNovaSenha(e.target.value)}
            style={{marginBottom: 8}}
          />
          <input
            className="botao"
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            style={{marginBottom: 8}}
          />
          {error && <div style={{color: '#ff4d4f', fontWeight: 600, marginBottom: 8}}>{error}</div>}
          {success && <div style={{color: '#22c55e', fontWeight: 600, marginBottom: 8}}>{success}</div>}
          <button type="submit" className="botao primario">Salvar nova senha</button>
          <button type="button" className="botao" style={{background: '#444', color: '#fff'}} onClick={() => navigate(-1)}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default AlterarSenha; 