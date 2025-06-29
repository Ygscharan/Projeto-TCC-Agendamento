import React, { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';

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
    <div className="container">
      <header className="header">
        <h1 className="titulo">Adicionar Loja</h1>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nome da loja:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="campo">
            <label>Endereço:</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div className="campo">
            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <button type="submit" className="botao">Cadastrar</button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      </main>
    </div>
  );
}

export default AdicionarLoja; 