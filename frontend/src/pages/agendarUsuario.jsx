import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../paginaUsuario.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Configuração de localização
const locales = { 'pt-BR': ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AgendarUsuario = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  // Função para gerar horários disponíveis
  const gerarHorariosDisponiveis = (data) => {
    const horarios = [];
    const turnos = [
      { inicio: 8, fim: 11 },
      { inicio: 13, fim: 18 },
    ];

    turnos.forEach((turno) => {
      for (let hora = turno.inicio; hora < turno.fim; hora++) {
        const inicio = new Date(data);
        inicio.setHours(hora, 0, 0, 0);

        const fim = new Date(inicio);
        fim.setHours(hora + 1);

        horarios.push({ start: inicio, end: fim });
      }
    });

    return horarios;
  };

  // Carrega os eventos do backend
  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        const agendamentos = response.data;

        const eventosFormatados = [];
        const agendadosPorData = {};

        // Organiza agendamentos por data
        agendamentos.forEach((item) => {
          const data = item.data_agendamento;
          const hora = new Date(item.data_hora_inicio).getHours();

          if (!agendadosPorData[data]) agendadosPorData[data] = [];
          agendadosPorData[data].push(hora);

          eventosFormatados.push({
            id: item.id,
            title: `Agendado às ${hora}:00`,
            start: new Date(item.data_hora_inicio),
            end: new Date(item.data_hora_fim),
            status: 'agendado',
          });
        });

        // Adiciona eventos de horários disponíveis
        Object.keys(agendadosPorData).forEach((data) => {
          const horarios = gerarHorariosDisponiveis(data);
          horarios.forEach(({ start, end }) => {
            const hora = start.getHours();
            if (!agendadosPorData[data].includes(hora)) {
              eventosFormatados.push({
                title: 'Disponível',
                start,
                end,
                status: 'disponivel',
              });
            }
          });
        });

        // Também adiciona dias futuros sem nenhum agendamento ainda
        const hoje = new Date();
        for (let i = 0; i < 15; i++) {
          const dia = new Date(hoje);
          dia.setDate(dia.getDate() + i);
          const dataStr = format(dia, 'yyyy-MM-dd');

          if (!agendadosPorData[dataStr]) {
            const horarios = gerarHorariosDisponiveis(dataStr);
            horarios.forEach(({ start, end }) => {
              eventosFormatados.push({
                title: 'Disponível',
                start,
                end,
                status: 'disponivel',
              });
            });
          }
        }

        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    fetchAgendamentos();
  }, []);

  // Cores dos eventos
  const eventStyleGetter = (event) => {
    let backgroundColor;

    switch (event.status) {
      case 'disponivel':
        backgroundColor = '#28a745'; // Verde
        break;
      case 'analise':
        backgroundColor = '#007bff'; // Azul
        break;
      case 'agendado':
        backgroundColor = '#6c757d'; // Cinza
        break;
      default:
        backgroundColor = '#17a2b8'; // Padrão
        break;
    }

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        padding: '4px',
      },
    };
  };

  // Ao clicar em um horário
  const handleSelectSlot = (slotInfo) => {
    const dataSelecionada = format(slotInfo.start, 'yyyy-MM-dd');
    navigate('/agendar-usuario2', { state: { data: dataSelecionada } });
  };

  return (
    <div className="agendamento-container">
      <h2>Agendamento de Cargas</h2>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        messages={{
          next: 'Próximo',
          previous: 'Anterior',
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
          date: 'Data',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'Não há eventos neste período.',
        }}
      />
    </div>
  );
};

export default AgendarUsuario;
