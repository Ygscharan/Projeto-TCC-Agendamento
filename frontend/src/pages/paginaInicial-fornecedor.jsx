import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../inicio.css';

function PaginaInicialFornecedor() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    const empresa = localStorage.getItem('empresa');

    if (nome) setNomeUsuario(nome);
    if (empresa) setNomeEmpresa(empresa);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Sistema de Agendamento de Carga do Mercado</h1>
        {(nomeUsuario || nomeEmpresa) && (
          <p className="bem-vindo">
            Bem-vindo(a), <strong>{nomeUsuario}</strong>
            {nomeEmpresa && <> – Empresa: <strong>{nomeEmpresa}</strong></>}
          </p>
        )}
      </header>

      <main className="main">
        <section className="secao-1">
          <h2 className="subtitulo">O que você deseja fazer?</h2>
          <div className="botoes">
            <Link to="/agendar-usuario" className="botao verde">Agendar Carga</Link>
            <Link to="/meus-agendamentos" className="botao verde">Meus Agendamentos</Link>
            <Link to="/adicionar-usuario" className="botao verde">Adicionar Usuários</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicialFornecedor;
