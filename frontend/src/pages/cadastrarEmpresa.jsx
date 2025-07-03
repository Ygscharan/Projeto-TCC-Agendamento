import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../adicionarUsuario.css';

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
    <div className="container">
      <header className="header">
        <h1 className="titulo">Cadastrar Empresa</h1>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nome da empresa:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="campo">
            <label>CNPJ:</label>
            <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
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

export default CadastrarEmpresa;
