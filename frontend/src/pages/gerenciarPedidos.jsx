import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../gerenciarPedidos.css';

const GerenciarPedidos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        setAgendamentos(response.data.filter(ag => 
          ag.status === 'PENDENTE' || ag.status === 'CONFIRMADO' ||
          ag.status === 'pendente' || ag.status === 'confirmado'
        ));
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    }
    carregarAgendamentos();
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/agendamentos/${id}`, {
        status: novoStatus.toLowerCase(),
      });
      if (novoStatus.toLowerCase() === 'concluido') {
        setAgendamentos(prev => prev.filter(ag => ag.id !== id));
      } else {
        setAgendamentos(prev => prev.map(ag => ag.id === id ? { ...ag, status: novoStatus } : ag));
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do agendamento.');
    }
  };

  const cancelarAgendamento = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja cancelar este agendamento?');
    if (!confirmar) return;
    try {
      await axios.put(`http://localhost:3000/api/agendamentos/${id}`, { status: 'CANCELADO' });
      setAgendamentos(prev => prev.map(ag => ag.id === id ? { ...ag, status: 'CANCELADO' } : ag));
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento.');
    }
  };

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
    <div className="container-gerenciar">
      <h2>Gerenciar Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Não há agendamentos cadastrados.</p>
      ) : (
        agendamentos.map(ag => (
          <div key={ag.id} className="card-agendamento">
            <p><strong>Data:</strong> {formatarData(ag.data_agendamento)}</p>
            <p>
              <strong>Horário:</strong> {formatarHora(ag.data_hora_inicio)}
            </p>
            <p><strong>Status:</strong> {ag.status?.charAt(0) + ag.status?.slice(1).toLowerCase()}</p>
            <p><strong>Loja:</strong> {ag.loja?.nome || 'N/A'}</p>
            <p><strong>Fornecedor:</strong> {ag.fornecedorAgendamento?.nome || 'N/A'}</p>
            {ag.arquivo_xml && (
              <a
                href={`http://localhost:3000/uploads/${ag.arquivo_xml}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visualizar XML
              </a>
            )}
            <div className="botoes">
              {ag.status === 'PENDENTE' && (
                <>
                  <button className="botao-confirmar" onClick={() => atualizarStatus(ag.id, 'CONFIRMADO')}>
                    Confirmar
                  </button>
                  <button className="botao-cancelar" onClick={() => cancelarAgendamento(ag.id)}>
                    Cancelar
                  </button>
                </>
              )}
              {ag.status === 'CONFIRMADO' && (
                <>
                  <button className="botao-concluir" onClick={() => atualizarStatus(ag.id, 'concluido')}>
                    Concluir
                  </button>
                  <button className="botao-cancelar" onClick={() => cancelarAgendamento(ag.id)}>
                    Cancelar
                  </button>
                </>
              )}
              {ag.status === 'CONCLUIDO' && (
                <span className="status-concluido">Concluído</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GerenciarPedidos;
