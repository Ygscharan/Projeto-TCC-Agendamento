const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamentoController');

router.get('/', AgendamentoController.getAgendamentos);
router.post('/', AgendamentoController.addAgendamento);
router.put('/:id', AgendamentoController.updateStatus);
router.delete('/:id', AgendamentoController.deleteAgendamento);

module.exports = router;
