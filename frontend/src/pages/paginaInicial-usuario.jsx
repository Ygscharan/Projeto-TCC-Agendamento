import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../PaginaInicialUsuario.css';
import { ArrowLeft, UserCircle, LogOut, Lock, ArrowRight } from 'lucide-react';


function PaginaInicialUsuario() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    if (nome) setNomeUsuario(nome);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleAlterarSenha = () => {
    navigate('/alterar-senha');
  };

  // Fecha o menu se clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="pagina-container">
      <div style={{ padding: '20px' }} className="top-bar">
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

        {/* Botão de Perfil */}
        <div className="perfil-wrapper" ref={menuRef}>
          <button className="perfil-btn" onClick={() => setShowMenu(!showMenu)}>
            <UserCircle size={28} />
            <span>{nomeUsuario}</span>
          </button>

          {showMenu && (
            <div className="perfil-menu">
              <button onClick={handleAlterarSenha}>
                <Lock size={16} /> Alterar Senha
              </button>
              <button onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <header className="pagina-header">
        <h1 className="pagina-titulo">Sistema de Agendamentos</h1>
      </header>

      <main className="pagina-main">
        <div className="pagina-card">
          <h2 className="pagina-subtitulo">O que você deseja fazer?</h2>
          <div className="pagina-botoes">
            <Link to="/agendar-usuario" className="botao primario">
              Agendar Carga
            </Link>
            <Link to="/gerenciar-pedidos" className="botao primario">
              Gerenciar Pedidos
            </Link>
            <Link to="/agendamentos" className="botao primario">
              Todos os Agendamentos
            </Link>
            <Link to="/adicionar-usuario" className="botao primario">
              Adicionar Usuários
            </Link>
            <Link to="/adicionar-loja" className="botao primario">
              Adicionar Loja
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaginaInicialUsuario;
