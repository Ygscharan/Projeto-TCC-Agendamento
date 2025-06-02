import React from 'react';
import { Link } from 'react-router-dom';
import '../paginaUsuario.css';

function PaginaInicialUsuario() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Bem-vindo ao Sistema de Agendamento de Carga do Mercado!</h1>
      </header>
      <main className="main">
        <section className="secao-1">
          <h2 className="subtitulo">Agendar Carga</h2>
          <p className="texto">Seja bem-vindo ao nosso sistema de agendamento de carga. Aqui você pode agendar suas cargas e gerenciar seus pedidos.</p>
          <Link to="/agendar-usuario" className="botao">Agendar Carga</Link>
        </section>
        <section className="secao-2">
          <h2 className="subtitulo">Gerenciar Pedidos</h2>
          <p className="texto">Gerencie os pedidos feitos pelos fornecedores.</p>
          <Link to="/gerenciar-pedidos" className="botao">Gerenciar Pedidos</Link>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicialUsuario;