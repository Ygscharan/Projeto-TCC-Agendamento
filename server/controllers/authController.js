const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Chave secreta para assinar o token
const SECRET_KEY = 'seu_segredo_super_secreto';

// Registrar usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    if (typeof nome !== 'string') {
      return res.status(400).json({ error: 'Nome deve ser uma string' });
    }
    // Verifica se o e-mail já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword, // Salva a senha criptografada no banco de dados
      tipo
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

    // Busca o usuário no banco
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    // Compara a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Recebendo login:', req.body);
    if (!senhaValida) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, SECRET_KEY, { expiresIn: '2h' });

    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};