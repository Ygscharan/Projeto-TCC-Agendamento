import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../paginaUsuario.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        horarios.push({ hora, start: inicio, end: fim });
      }
    });

    return horarios;
  };

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        const agendamentos = response.data;

        const eventosFormatados = [];
        const agendadosPorData = {};

        agendamentos.forEach((item) => {
          const data = item.data_agendamento;
          const hora = new Date(item.data_hora_inicio).getHours();

          if (!agendadosPorData[data]) agendadosPorData[data] = [];
          agendadosPorData[data].push(hora);
        });

        const hoje = new Date();
        for (let i = 0; i < 15; i++) {
          const dia = new Date(hoje);
          dia.setDate(dia.getDate() + i);
          const dataStr = format(dia, 'yyyy-MM-dd');

          const horarios = gerarHorariosDisponiveis(dataStr);
          const horasAgendadas = agendadosPorData[dataStr] || [];
          const disponiveis = horarios.filter(({ hora }) => !horasAgendadas.includes(hora));

          const start = horarios[0].start;
          const end = horarios[horarios.length - 1].end;

          eventosFormatados.push({
            id: dataStr,
            title: isBefore(start, new Date())
              ? 'Data passada'
              : disponiveis.length > 0
              ? `${disponiveis.length} horário(s) disponível(eis)`
              : 'Agendado',
            start,
            end,
            status: isBefore(start, new Date())
              ? 'passado'
              : disponiveis.length > 0
              ? 'disponivel'
              : 'agendado',
          });
        }

        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    fetchAgendamentos();
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor;

    switch (event.status) {
      case 'disponivel':
        backgroundColor = '#28a745'; // Verde
        break;
      case 'agendado':
        backgroundColor = '#6c757d'; // Cinza escuro
        break;
      case 'passado':
        backgroundColor = '#b1b1b1'; // Cinza claro
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
        cursor: event.status === 'disponivel' ? 'pointer' : 'default',
      },
    };
  };

  const handleSelectSlot = (slotInfo) => {
    if (isBefore(slotInfo.start, new Date())) return;
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
