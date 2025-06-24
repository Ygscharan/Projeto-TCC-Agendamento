import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../gerenciarPedidos.css';

const GerenciarPedidos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function carregarAgendamentos() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        const pendentes = response.data.filter(ag => ag.status === 'PENDENTE');
        setAgendamentos(pendentes);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    }

    carregarAgendamentos();
  }, []);

  const confirmarAgendamento = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/agendamentos/${id}`, {
        status: 'confirmado',
      });

      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      alert('Erro ao confirmar agendamento.');
    }
  };

  const cancelarAgendamento = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja cancelar este agendamento?');

    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/agendamentos/${id}`);
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento.');
    }
  };

  return (
    <div className="container-gerenciar">
      <h2>Agendamentos Pendentes</h2>

      {agendamentos.length === 0 ? (
        <p>Não há agendamentos pendentes.</p>
      ) : (
        agendamentos.map(ag => (
          <div key={ag.id} className="card-agendamento">
            <p><strong>Data:</strong> {ag.data_agendamento}</p>
            <p>
              <strong>Horário:</strong>{' '}
              {new Date(ag.data_hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>

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
              <button className="botao-confirmar" onClick={() => confirmarAgendamento(ag.id)}>
                Confirmar
              </button>
              <button className="botao-cancelar" onClick={() => cancelarAgendamento(ag.id)}>
                Cancelar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GerenciarPedidos;
