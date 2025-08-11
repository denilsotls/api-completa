const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const User = require('./src/models/User');
const mongoose = require('mongoose'); // Adicione esta linha

// Carregar as variáveis de ambiente
dotenv.config();

// Função assíncrona para testar o banco de dados
const testDB = async () => {
  try {
    // Conecta ao banco de dados
    await connectDB();

    // 1. Criar um novo usuário
    const newUser = new User({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123'
    });

    // 2. Salvar o usuário no banco de dados
    const savedUser = await newUser.save();
    console.log('Usuário salvo com sucesso:', savedUser);

    // 3. Buscar o usuário que acabamos de salvar
    const foundUser = await User.findOne({ username: 'johndoe' });
    console.log('Usuário encontrado:', foundUser);

  } catch (error) {
    console.error('Erro durante o teste:', error.message);
  } finally {
    // 4. Fechar a conexão com o banco de dados após o teste
    await mongoose.connection.close();
  }
};

// Executar a função de teste
testDB();