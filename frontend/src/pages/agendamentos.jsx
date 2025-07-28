import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../meusAgendamentos.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtroData, setFiltroData] = useState('');
  const [filtroLoja, setFiltroLoja] = useState('');
  const [filtroFornecedor, setFiltroFornecedor] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [lojas, setLojas] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [statusUnicos, setStatusUnicos] = useState([]);

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        setAgendamentos(response.data);
        
        setLojas(Array.from(new Set(response.data.map(a => a.loja?.nome).filter(Boolean))));
        
        setFornecedores(Array.from(new Set(response.data.map(a => a.fornecedorAgendamento?.nome).filter(Boolean))));
        
        setStatusUnicos(Array.from(new Set(response.data.map(a => a.status).filter(Boolean))));
      } catch (err) {
        setAgendamentos([]);
      }
    }
    fetchAgendamentos();
  }, []);


  const agendamentosFiltrados = agendamentos.filter(ag => {
    const dataOk = !filtroData || (ag.data_agendamento && ag.data_agendamento.slice(0, 10) === filtroData);
    const lojaOk = !filtroLoja || ag.loja?.nome === filtroLoja;
    const fornecedorOk = !filtroFornecedor || ag.fornecedorAgendamento?.nome === filtroFornecedor;
    const statusOk = !filtroStatus || ag.status === filtroStatus;
    return dataOk && lojaOk && fornecedorOk && statusOk;
  });


  function formatarData(dataStr) {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
  }
  function formatarHora(dataStr) {
    if (!dataStr) return '';
    return dataStr.slice(11, 16);
  }

  return (
    <div className="meus-agendamentos-container">
      <div className="top-bar">
        <div className="navegacao-btns">
          <button onClick={() => window.history.back()} className="voltar-btn">
            <ArrowLeft size={20} />
            <span className="texto-voltar">Voltar</span>
          </button>
          <button onClick={() => window.history.forward()} className="avancar-btn">
            <span className="texto-avancar">Avançar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <h2 className="titulo-agendamentos">Todos os Agendamentos</h2>
      <div className="filtros-agendamentos">
        <input
          type="date"
          value={filtroData}
          onChange={e => setFiltroData(e.target.value)}
          className="filtro-input"
        />
        <select
          value={filtroLoja}
          onChange={e => setFiltroLoja(e.target.value)}
          className="filtro-input"
        >
          <option value="">Loja</option>
          {lojas.map(loja => (
            <option key={loja} value={loja}>{loja}</option>
          ))}
        </select>
        <select
          value={filtroFornecedor}
          onChange={e => setFiltroFornecedor(e.target.value)}
          className="filtro-input"
        >
          <option value="">Fornecedor</option>
          {fornecedores.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select
          value={filtroStatus}
          onChange={e => setFiltroStatus(e.target.value)}
          className="filtro-input"
        >
          <option value="">Status</option>
          {statusUnicos.map(status => (
            <option key={status} value={status}>{status.charAt(0) + status.slice(1).toLowerCase()}</option>
          ))}
        </select>
        {(filtroData || filtroLoja || filtroFornecedor || filtroStatus) && (
          <button className="filtro-limpar" onClick={() => {
            setFiltroData(''); setFiltroLoja(''); setFiltroFornecedor(''); setFiltroStatus('');
          }}>
            Limpar filtros
          </button>
        )}
      </div>
      <div className="agendamentos-lista">
        {agendamentosFiltrados.map((agendamento) => (
          <div className="agendamento-card" key={agendamento.id}>
            <div className="agendamento-info">
              <span className="agendamento-data"><strong>Data:</strong> {formatarData(agendamento.data_agendamento)}</span>
              <span className="agendamento-horario"><strong>Horário:</strong> {formatarHora(agendamento.data_hora_inicio)}</span>
              <span className="agendamento-loja"><strong>Loja:</strong> {agendamento.loja?.nome || 'N/A'}</span>
              <span className="agendamento-fornecedor"><strong>Fornecedor:</strong> {agendamento.fornecedorAgendamento?.nome || 'N/A'}</span>
              <span className="agendamento-status"><strong>Status:</strong> {agendamento.status?.charAt(0) + agendamento.status?.slice(1).toLowerCase()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agendamentos; 