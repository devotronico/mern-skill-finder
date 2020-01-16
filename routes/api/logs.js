const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Log = require('../../models/Log');

/**
 * @route   GET api/logs
 * @desc    Get all logs
 * @webpage /logs
 * @action  getLogs
 * @access  Private
 * @returns {Json} Array di logs
 */
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().populate('user_id', ['name', 'email']);

    res.json(logs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/logs/:id
 * @desc    Get single log by id
 * @webpage /logs/:id
 * @action  getLog
 * @access  Private
 * @returns {Json} documento del log cercato
 * argomento 1:
 *   '/:id' l'id del log da utilizzare per cercarlo nel db
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il log da mostrare tramite l'id del log
 *     ricevuto come parametro dell' url
 * [b] Se il log non è stato trovato ritorna un errore.
 */
router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id); // [a]

    if (!log) {
      return res.status(404).json({ msg: 'Log non trovato' }); // [b]
    }

    res.json(log);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Log non trovato' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/logs
 * @desc    Create a log
 * @webpage not used
 * @action  addLog
 * @access  Private
 * @returns {Json} documento del log
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il documento User tramite user.id ricevuto dal token jwt.
 * [b] Crea il documento Log con:
 *       1. il valore di `text` present nel body
 *       2. i valori `name`,`email`, presi dal documento User
 *       3. il valore `id` dell' user estrapolato dal token
 * [c] salva il nuovo documento.
 */
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // [a]

    const newLog = new Log({
      text: req.body.text,
      type: req.body.type,
      user_id: req.user.id
    }); // [b]

    const log = await newLog.save(); // [c]
    res.json(log);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error 1');
  }
});

/**
 * @route   DELETE api/logs/:id
 * @desc    Delete a log by id
 * @webpage
 * @action
 * @access  Private
 * @returns {Json} messaggio di successo
 * argomento 1:
 *   '/:id' l'id del log da utilizzare per cercarlo nel db
 * [a] Cerca il log da eliminare tramite l'id del log
 *     ricevuto come parametro dell' url
 * [b] Se il log non è stato trovato ritorna un errore.
 * [c] Se l'id di post.user e
 *     l'id di user ottenuto tramite token jwt
 *     sono diversi ritorna un errore.
 *     Questo controllo serve a limitare la cancellazione
 *     del log solo all'user che l'ha creato
 * [d] Il log viene eliminato.
 */
router.delete('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id); // [a]

    if (!log) {
      return res.status(404).json({ msg: 'Log non trovato' });
    } // [b]

    //   if (log.user.toString() !== req.user.id) {
    //     return res.status(401).json({ msg: 'User not authorized' });
    //   } // [c]

    await log.remove(); // [d]

    res.json({ msg: 'Log cancellato' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Log non trovato' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
