const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

/**
 * @route   [1] GET api/auth
 * @desc    Get User data from sending token jwt
 * @access  Public
 * @returns {Json} - {_id, name, email, avatar, date, __v}
 * Ottenere tutti i dati di un user cercando per il suo id
 * argomento 2:
 *   Setta la Rotta 'api/auth' come protetta inserendo il middleware auth
 *   Per accedere a questa rotta bisogna fare una request GET
 *   inviando il token jwt negli headers:
 *   KEY: x-auth-token
 *   VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoi
 *   NWRlZDE4ZWZiZDE3MWMzZWU4Njk1NGVlIn0sImlhdCI6MTU3NTgxOTUwMywiZXhw
 *   IjoxNTc2MTc5NTAzfQ.S3aEDNEmaAxNZDcHLIhdK9vlqobk94Fr8QAsE49-lxQ
 * argomento 3:
 *   callback(req,res). Con il metodo `findById` cerca nella collection User un
 *   user con un specifico id e ritorna tutto i dati dell'user tranne la password
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/auth
 * @desc    Login/Signin. Authenticate user with email & password e get token
 * @access  Public
 * @returns {String} Json Web Token
 * argomento 1:
 *   con '/' la rotta rimane 'api/auth'.
 * argomento 2:
 *   middleware di array di metodi check di express-validator per settare i
 *   controlli di validità dei valori inseriti dall'utente.
 * argomento 3:
 *   req: invia al server i parametri del body(name, email, password)
 *   res: ritorna la risposta dal server
 * [a] Con l'email inserita dall'utente cerca l'user nel db.
 * [a] Se non è stato trovato ritorna un errore.
 * [b] Confronta la password inserita dall'utente con quella nel database.
 * [b] Se le password sono diverse ritorna un errore.
 * [c] Generare il Token JWT:
 *  Creare l'oggetto payload che deve contenere il valore dell'id dell' user
 *  da prendere dal documento dell'user trovato.
 *  Il metodo `sign` genera il token jwt passandogli gli argomenti:
 *    arg 1: payload per passare l'id dell'user. @see https://jwt.io/#debugger
 *    arg 2: una chiave segreta a libera scelta, settata nel file `default.json`.
 *    arg 3: tempo di vita del token (3600 è uguale a un ora)
 *    arg 4: callback - ritorna il token al client oppure ritorna un errore
 */
router.post(
  '/',
  [
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password ir required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // [a]
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credential' }] }); // [a]
      }

      const isMatch = await bcrypt.compare(password, user.password); // [b]
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credential' }] }); // [b]
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); // [c]
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
