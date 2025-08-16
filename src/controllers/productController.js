const Product = require('../models/Product');

// Rota: POST /api/products
// Descrição: Cria um novo produto
// Rota: POST /api/products
// Descrição: Cria um novo produto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    // Verifique se o erro é de validação do Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: messages });
    }
    // Se for outro tipo de erro, envie o erro padrão
    res.status(500).json({ error: 'Erro no servidor. Por favor, tente novamente.' });
  }
};

// Rota: GET /api/products
// Descrição: Lista todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rota: GET /api/products/:id
// Descrição: Busca um produto pelo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rota: PUT /api/products/:id
// Descrição: Atualiza um produto pelo ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rota: DELETE /api/products/:id
// Descrição: Deleta um produto pelo ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};