const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de que este caminho está correto

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Criar e salvar o novo usuário no banco de dados
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para fazer o login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // 2. Comparar a senha fornecida com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // 3. Gerar o JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h' // O token expira em 1 hora
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};