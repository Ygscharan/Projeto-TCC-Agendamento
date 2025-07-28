import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function CadastrarEmpresa() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !cnpj || !telefone) {
      setError('Nome, CNPJ e telefone são obrigatórios.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/fornecedores', {
        nome,
        cnpj,
        endereco,
        telefone
      });

      setSuccess('Empresa cadastrada com sucesso!');
      setError('');
      setNome('');
      setCnpj('');
      setEndereco('');
      setTelefone('');

      
      setTimeout(() => navigate('/adicionar-usuario'), 2000);
    } catch (err) {
      console.error(err);
      setError('Erro ao cadastrar empresa. Verifique os dados e tente novamente.');
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
        <h1 className="ad-usuario-titulo">Cadastrar Empresa</h1>
      </header>
      <main className="ad-usuario-main">
        <form onSubmit={handleSubmit}>
          <div className="ad-usuario-campo">
            <label className="ad-usuario-label">Nome da empresa:</label>
            <input className="ad-usuario-input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="ad-usuario-campo">
            <label className="ad-usuario-label">CNPJ:</label>
            <input className="ad-usuario-input" type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
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

export default CadastrarEmpresa;
