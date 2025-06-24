import React from 'react';
import { Link } from 'react-router-dom';
import '../inicio.css';

function PaginaInicialUsuario() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Sistema de Agendamento de Carga do Mercado</h1>
      </header>
      <main className="main">
        <section className="secao-1">
          <h2 className="subtitulo">O que você deseja fazer?</h2>
          <div className="botoes">
            <Link to="/agendar-usuario" className="botao verde">Agendar Carga</Link>
            <Link to="/gerenciar-pedidos" className="botao verde">Gerenciar Pedidos</Link>
            <Link to="/adicionar-usuario" className="botao verde">Adicionar Usuários</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicialUsuario;