import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../inicio.css';

function PaginaInicialUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Sistema de Agendamento de Carga do Mercado</h1>
        {nomeUsuario && (
          <p className="bem-vindo">
            Bem-vindo(a), <strong>{nomeUsuario}</strong>
            <button className="botao logout" onClick={handleLogout} style={{marginLeft: 24}}>Logout</button>
          </p>
        )}
      </header>

      <main className="main">
        <section className="secao-1">
          <h2 className="subtitulo">O que você deseja fazer?</h2>
          <div className="botoes">
            <Link to="/agendar-usuario" className="botao verde">Agendar Carga</Link>
            <Link to="/gerenciar-pedidos" className="botao verde">Gerenciar Pedidos</Link>
            <Link to="/agendamentos" className="botao verde">Todos os Agendamentos</Link>
            <Link to="/adicionar-usuario" className="botao verde">Adicionar Usuários</Link>
            <Link to="/adicionar-loja" className="botao verde">Adicionar Loja</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicialUsuario;
