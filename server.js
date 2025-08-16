const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/database');
// Importar as rotas de produtos
const productRoutes = require('./src/routes/product');
app.use(express.json()); // Middleware para analisar o corpo das requisições em formato JSON

// Usar as rotas de produtos com o prefixo /api/products
app.use('/api/products', productRoutes);

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

app.use(express.json()); // Middleware para analisar o corpo das requisições em formato JSON

// Importar as rotas de autenticação (ajuste o caminho se necessário)
const authRoutes = require('./src/routes/auth');

// Usar as rotas de autenticação com o prefixo /api/auth
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Definir porta
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
