const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// CREATE: Criar um novo produto
router.post('/', auth, productController.createProduct);

// READ: Listar todos os produtos
router.get('/', productController.getProducts);

// READ: Buscar um produto pelo ID
router.get('/:id', productController.getProductById);

// UPDATE: Atualizar um produto pelo ID
router.put('/:id', auth, productController.updateProduct);

// DELETE: Deletar um produto pelo ID
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;