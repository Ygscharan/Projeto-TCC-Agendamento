import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../inicio.css';

function PaginaInicialFornecedor() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    const fornecedor = localStorage.getItem('fornecedor_nome');

    if (nome) setNomeUsuario(nome);
    if (fornecedor) setNomeEmpresa(fornecedor);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Sistema de Agendamento de Carga do Mercado</h1>
        {(nomeUsuario || nomeEmpresa) && (
          <p className="bem-vindo">
            Bem-vindo(a), <strong>{nomeUsuario}</strong>
            {nomeEmpresa && <>, fornecedor: <strong>{nomeEmpresa}</strong></>}
            <button className="botao logout" onClick={handleLogout} style={{marginLeft: 24}}>Logout</button>
          </p>
        )}
      </header>

      <main className="main">
        <section className="secao-1">
          <h2 className="subtitulo">O que você deseja fazer?</h2>
          <div className="botoes">
            <Link to="/agendar-usuario" className="botao verde">Agendar Carga</Link>
            <Link to="/meus-agendamentos" className="botao verde">Meus Agendamentos</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicialFornecedor;
