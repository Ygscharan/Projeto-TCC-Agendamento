import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../meusAgendamentos.css';
import { toZonedTime, format as formatTz } from 'date-fns-tz';

function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroLoja, setFiltroLoja] = useState('');
  const [lojas, setLojas] = useState([]);

  useEffect(() => {
    const nomeEmpresa = localStorage.getItem('fornecedor_nome');
    console.log('Nome da empresa encontrado no localStorage:', nomeEmpresa);

    if (!nomeEmpresa) {
      setErro('Empresa do fornecedor não encontrada.');
      return;
    }

    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/agendamentos/fornecedor/${encodeURIComponent(nomeEmpresa)}`
        );
        setAgendamentos(response.data);
        
        const lojasUnicas = Array.from(new Set(response.data.map(a => a.loja?.nome).filter(Boolean)));
        setLojas(lojasUnicas);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        setErro('Erro ao buscar agendamentos');
      }
    };

    fetchAgendamentos();
  }, []);

  
  const agendamentosFiltrados = agendamentos.filter(ag => {
    const dataOk = !filtroData || (ag.data_agendamento && ag.data_agendamento.slice(0, 10) === filtroData);
    const statusOk = !filtroStatus || ag.status === filtroStatus;
    const lojaOk = !filtroLoja || ag.loja?.nome === filtroLoja;
    return dataOk && statusOk && lojaOk;
  });

  
  const statusUnicos = Array.from(new Set(agendamentos.map(a => a.status).filter(Boolean)));

  
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
      <h2 className="titulo-agendamentos">Meus Agendamentos</h2>
      {/* Filtros */}
      <div className="filtros-agendamentos">
        <input
          type="date"
          value={filtroData}
          onChange={e => setFiltroData(e.target.value)}
          className="filtro-input"
        />
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
        {(filtroData || filtroStatus || filtroLoja) && (
          <button className="filtro-limpar" onClick={() => {setFiltroData('');setFiltroStatus('');setFiltroLoja('');}}>
            Limpar filtros
          </button>
        )}
      </div>
      {erro && agendamentosFiltrados.length === 0 && <p className="erro-agendamento">{erro}</p>}
      {!erro && agendamentosFiltrados.length === 0 && <p className="nenhum-agendamento">Nenhum agendamento encontrado.</p>}
      <div className="agendamentos-lista">
        {agendamentosFiltrados.map((agendamento) => (
          <div className="agendamento-card" key={agendamento.id}>
            <div className="agendamento-info">
              <span className="agendamento-data"><strong>Data:</strong> {formatarData(agendamento.data_agendamento)}</span>
              <span className="agendamento-horario"><strong>Horário:</strong> {formatarHora(agendamento.data_hora_inicio)}</span>
              <span className="agendamento-loja"><strong>Loja:</strong> {agendamento.loja?.nome || 'N/A'}</span>
              <span className="agendamento-fornecedor"><strong>Fornecedor:</strong> {agendamento.fornecedorAgendamento?.nome || 'N/A'}</span>
            </div>
            {/* Exemplo de status, se existir no objeto agendamento */}
            {agendamento.status && (
              <span className={`agendamento-status status-${agendamento.status.toLowerCase()}`}>
                {agendamento.status.charAt(0) + agendamento.status.slice(1).toLowerCase()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeusAgendamentos;
