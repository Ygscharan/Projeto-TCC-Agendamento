const db = require('../config/db');

// Função para listar todos os agendamentos
const getAllAgendamentos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM agendamentos', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Função para adicionar um novo agendamento
const createAgendamento = (agendamento) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO agendamentos (fornecedor_id, loja_id, data_agendamento, data_entrega, nota_fiscal_id, confirmado) VALUES (?, ?, ?, ?, ?, ?)',
            [
                agendamento.fornecedor_id,
                agendamento.loja_id,
                agendamento.data_agendamento,
                agendamento.data_entrega,
                agendamento.nota_fiscal_id,
                agendamento.confirmado,
            ],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

// Função para atualizar o status do agendamento
// falta alterar o status de pendente para cancelado ou confirmado
const updateAgendamentoStatus = (id, confirmado) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE agendamentos SET  confirmado = ? WHERE id = ?',
            [confirmado, id],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

// Função para excluir um agendamento
const deleteAgendamento = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM agendamentos WHERE id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = { getAllAgendamentos, createAgendamento, updateAgendamentoStatus, deleteAgendamento };
