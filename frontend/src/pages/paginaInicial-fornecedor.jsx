import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../PaginaInicialUsuario.css';
import { ArrowLeft, UserCircle, LogOut, Lock, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

function PaginaInicialFornecedor() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

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
        <div className="perfil-wrapper" ref={menuRef}>
          <button className="perfil-btn" onClick={() => setShowMenu(!showMenu)}>
            <UserCircle size={28} />
            <span>{nomeUsuario}</span>
          </button>
          {showMenu && (
            <div className="perfil-menu">
              <button onClick={() => navigate('/alterar-senha')}>
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
        <h1 className="pagina-titulo">Sistema de Agendamento de Carga do Mercado</h1>
      </header>
      <main className="pagina-main">
        <div className="pagina-card">
          <h2 className="pagina-subtitulo">O que você deseja fazer?</h2>
          <div className="pagina-botoes">
            <Link to="/agendar-usuario" className="botao primario">Agendar Carga</Link>
            <Link to="/meus-agendamentos" className="botao primario">Meus Agendamentos</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaginaInicialFornecedor;
