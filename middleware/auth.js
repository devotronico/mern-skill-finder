const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @desc Middleware with JWT
 * Esporta una funzione middleware
 * [a] ottiene il token dall header della request
 * [b] se non trova il token ritorna un errore
 * [c] il token viene decodificato
 *     verificandolo con la parola chiave
 *     `jwtSecret` che sta nel file `default.json`
 * [d] dal token decodificato viene estratto il
 *     valore di user che viene passato alla request
 */
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token'); // [a]

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  } // [b]

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); // [c]
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
