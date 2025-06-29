const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Fornecedor = require('../models/fornecedor');

const SECRET_KEY = 'seu_segredo_super_secreto';

// Registrar usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, fornecedor_id } = req.body;

    if (typeof nome !== 'string') {
      return res.status(400).json({ error: 'Nome deve ser uma string' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo,
      fornecedor_id: tipo === 'FORNECEDOR' ? fornecedor_id : null
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário com o fornecedor associado (se existir)
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: Fornecedor, as: 'fornecedorUsuario' }]
    });

    if (!usuario) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, SECRET_KEY, { expiresIn: '2h' });

    // Envia os dados necessários para o frontend
    res.json({
  message: 'Login realizado com sucesso!',
  token,
  nome: usuario.nome,
  tipo: usuario.tipo,
  fornecedor: usuario.fornecedorUsuario
    ? { id: usuario.fornecedorUsuario.id, nome: usuario.fornecedorUsuario.nome }
    : null
});
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
