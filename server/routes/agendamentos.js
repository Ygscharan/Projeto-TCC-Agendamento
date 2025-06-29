const express = require('express');
const multer = require('multer');
const path = require('path');

const {
  getAllAgendamentos,
  getAgendamentosPorFornecedor, // ✅ Adicionado
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
} = require('../controllers/agendamentoController');

const { Agendamento } = require('../models');

const router = express.Router();

// Configuração do multer para upload de XML
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.xml') {
      return cb(new Error('Somente arquivos .xml são permitidos'), false);
    }
    cb(null, true);
  }
});

// ✅ Nova rota para buscar agendamentos por nome do fornecedor
router.get('/fornecedor/:nomeFornecedor', getAgendamentosPorFornecedor);

// Rota para listar todos os agendamentos
router.get('/', getAllAgendamentos);

// Rota para criar um novo agendamento com upload de XML
router.post('/upload', upload.single('xml'), async (req, res) => {
  try {
    const agendamento = req.body;

    if (!agendamento.data_hora_inicio || !agendamento.data_agendamento) {
      return res.status(400).json({ message: 'Campos de data são obrigatórios.' });
    }

    const dataInicio = new Date(agendamento.data_hora_inicio);
    if (isNaN(dataInicio.getTime())) {
      return res.status(400).json({ message: 'data_hora_inicio inválida.' });
    }

    dataInicio.setSeconds(0);
    dataInicio.setMilliseconds(0);
    agendamento.data_hora_inicio = dataInicio.toISOString();

    const conflito = await Agendamento.findOne({
      where: {
        data_agendamento: agendamento.data_agendamento,
        data_hora_inicio: agendamento.data_hora_inicio
      }
    });

    if (conflito) {
      return res.status(409).json({ message: 'Já existe um agendamento neste horário.' });
    }

    if (req.file) {
      agendamento.arquivo_xml = req.file.filename;
    }

    const novoAgendamento = await createAgendamento(agendamento);
    res.status(201).json(novoAgendamento);

  } catch (error) {
    console.error('Erro ao criar agendamento com upload:', error);
    res.status(500).json({ message: 'Erro ao criar agendamento', error });
  }
});

// Rota para atualizar um agendamento
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const agendamento = req.body;
    const agendamentoAtualizado = await updateAgendamento(id, agendamento);
    res.json(agendamentoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
  }
});

// Rota para deletar um agendamento
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAgendamento(id);
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar agendamento', error });
  }
});

module.exports = router;
