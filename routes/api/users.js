const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

/**
 * @route   POST api/users
 * @desc    Register/Signup a User con name, email, password
 * @webpage /register
 * @action  register
 * @access  Public
 * @returns {String} Json Web Token
 * argomento 1:
 *   con '/' la rotta rimane 'api/users'
 * argomento 2:
 *   middleware di array di metodi check di express-validator per settare
 *   i controlli di validità dei valori inseriti dall'utente.
 * argomento 3:
 *   req: invia al server i parametri del body(name, email, password).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 *   [a] `validationResult` check la validità dei valori(name,email,password).
 *   [b] Se l'email è già presente nel database ritorna errore.
 * [c] Generato un avatar. @see https://www.npmjs.com/package/gravatar-url
 * [d] Crea un documento User con i valori:name,email,avatar,password.
 * [e] Viene fatto l'Encrypt della password.
 * [f] Col metodo `save` viene salvato il nuovo user nel db assegnandogli un id.
 * [g] l'id assegnatogli va inserito nel payload per generare il token jwt.
 * [h] Il metodo `sign` Genera un token jwt, gli argomenti da passare sono:
 *   arg 1: payload per passare l'id dell'user. @see https://jwt.io/#debugger
 *   arg 2: una chiave segreta a libera scelta, settata nel file `default.json`.
 *   arg 3: tempo di vita del token (3600 è uguale a un ora)
 *   arg 4: callback - ritorna il token al client oppure ritorna un errore
 */
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Enter a pass with min 6 chars').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } // [a]

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // [b]
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      } // [b]

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }); // [c]

      const totalUser = await User.countDocuments();
      const role = !totalUser ? 'system' : totalUser === 1 ? 'admin' : 'user';

      user = new User({ name, email, avatar, password, role }); // [d]

      const salt = await bcrypt.genSalt(10); // [e]
      user.password = await bcrypt.hash(password, salt); // [e]

      await user.save(); // [f]

      const payload = {
        user: {
          id: user.id
        }
      }; // [g]

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); // [h]
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
