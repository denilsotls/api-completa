const jwt = require('jsonwebtoken');

// Middleware para proteger rotas
module.exports = function(req, res, next) {
  // Pega o token do cabeçalho da requisição
  const token = req.header('x-auth-token');

  // Se não houver token, retorna um erro 401 (Não Autorizado)
  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  // Verifica o token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o usuário do payload (conteúdo) do token à requisição
    req.user = decoded.user;
    next(); // Permite que a requisição continue
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido' });
  }
};