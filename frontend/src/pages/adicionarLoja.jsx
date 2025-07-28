import React, { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function AdicionarLoja() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !endereco) {
      setError('Nome e endereço são obrigatórios.');
      return;
    }

    try {
      await Api.post('/api/lojas', {
        nome,
        endereco,
        telefone
      });
      setSuccess('Loja cadastrada com sucesso!');
      setError('');
      setNome('');
      setEndereco('');
      setTelefone('');
      setTimeout(() => navigate('/pagina-inicial-usuario'), 1500);
    } catch (err) {
      setError('Erro ao cadastrar loja. Verifique os dados e tente novamente.');
      setSuccess('');
    }
  };

  return (
    <div className="ad-usuario-container">
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
      <header className="ad-usuario-header">
        <h1 className="ad-usuario-titulo">Adicionar Loja</h1>
      </header>
      <main className="ad-usuario-main">
        <form onSubmit={handleSubmit}>
          <div className="ad-usuario-campo">
            <label className="ad-usuario-label">Nome da loja:</label>
            <input className="ad-usuario-input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="ad-usuario-campo">
            <label className="ad-usuario-label">Endereço:</label>
            <input className="ad-usuario-input" type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div className="ad-usuario-campo">
            <label className="ad-usuario-label">Telefone:</label>
            <input className="ad-usuario-input" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <button type="submit" className="ad-usuario-botao">Cadastrar</button>
          {error && <div className="ad-usuario-error">{error}</div>}
          {success && <div className="ad-usuario-success">{success}</div>}
        </form>
      </main>
    </div>
  );
}

export default AdicionarLoja; 