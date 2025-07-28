import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdicionarUsuario from './pages/adicionarUsuario';
import Login from './pages/Login';
import PaginaInicialFornecedor from './pages/paginaInicial-fornecedor';
import PaginaInicialUsuario from './pages/paginaInicial-usuario';
import AgendarUsuario from './pages/agendarUsuario';
import AgendarUsuario2 from './pages/agendarUsuario2';
import GerenciarPedidos from './pages/gerenciarPedidos';
import CadastrarEmpresa from './pages/cadastrarEmpresa';
import MeusAgendamentos from './pages/meusAgendamentos';
import AdicionarLoja from './pages/adicionarLoja';
import Agendamentos from './pages/agendamentos';
import AlterarSenha from './pages/alterar-senha';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial-fornecedor" element={<PaginaInicialFornecedor />} />
        <Route path="/pagina-inicial-usuario" element={<PaginaInicialUsuario />} />
        <Route path="/adicionar-usuario" element={<AdicionarUsuario />} />
        <Route path="/agendar-usuario" element={<AgendarUsuario />} />
        <Route path="/agendar-usuario2" element={<AgendarUsuario2 />} />
        <Route path="/gerenciar-pedidos" element={<GerenciarPedidos />} />
        <Route path="/cadastrar-empresa" element={<CadastrarEmpresa />} />
        <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
        <Route path="/adicionar-loja" element={<AdicionarLoja />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;