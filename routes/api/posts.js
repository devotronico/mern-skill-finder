const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route   GET api/posts
 * @desc    Get all posts
 * @webpage ?
 * @action  getPosts
 * @access  Private
 * @returns {Json} array di documenti post
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca tutti i post e li ordina per data descending
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // [a]
    res.json(posts); // [e]
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/posts/:id
 * @desc    Get a single post by urlParam id
 * @webpage ?
 * @action  getPost
 * @access  Private
 * @returns {Json} documento del post cercato
 * argomento 1:
 *   '/:id' l'id del post da utilizzare per cercarlo nel db
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il post da mostrare tramite l'id del post
 *     ricevuto come parametro dell' url
 * [b] Se il post non è stato trovato ritorna un errore.
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // [a]

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' }); // [b]
    }

    res.json(post); // [e]
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/posts
 * @desc    Create a single post
 * @webpage ?
 * @action  addPost
 * @access  Private
 * @returns {Json} documento del post
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi `check` di `express-validator` per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se il valore `text` presente nel body della request NON rispetta
 *     i controlli del middleware `express-validator` ritorna un errore.
 * [b] Cerca il documento User tramite user.id ricevuto dal token jwt.
 * [c] Crea il documento Post con:
 *       1. il valore di `text` present nel body
 *       2. i valori `name`,`avatar`, presei dal documento User
 *       3. il valore `id` dell' user estrapolato dal token
 * [d] salva il nuovo documento.
 */
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // [a]

    try {
      const user = await User.findById(req.user.id).select('-password'); // [d]

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }); // [c]

      const post = await newPost.save(); // [d]
      res.json(post); // [e]
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete a post by urlParam id
 * @webpage ?
 * @action  deletePost
 * @access  Private
 * @returns {Json} messaggio di successo
 * argomento 1:
 *   '/:id' l'id del post da utilizzare per cercarlo nel db
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il post da eliminare tramite l'id del post
 *     ricevuto come parametro dell' url
 * [b] Se il post non è stato trovato ritorna un errore.
 * [c] Se l'id di post.user e
 *     l'id di user ottenuto tramite token jwt
 *     sono diversi ritorna un errore.
 *     Questo controllo serve a limitare la cancellazione
 *     del post solo all'user che l'ha creato
 * [d] Il post viene eliminato.
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // [a]

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    } // [b]

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    } // [c]

    await post.remove(); // [d]

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/posts/comment/:id
 * @desc    Create a comment on a post
 * @webpage ?
 * @action  addComment
 * @access  Private
 * @returns {Json} documento del post
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi `check` di `express-validator` per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se il valore `text` presente nel body della request NON rispetta
 *     i controlli del middleware `express-validator` ritorna un errore.
 * [b] Cerca il documento User tramite user.id ricevuto dal token jwt.
 * [c] Crea il documento Post con:
 *       1. il valore di `text` present nel body
 *       2. i valori `name`,`avatar`, presei dal documento User
 *       3. il valore `id` dell' user estrapolato dal token
 * [d] salva il nuovo documento.
 */
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // [a]

    try {
      const user = await User.findById(req.user.id).select('-password'); // [d]
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }; // [c]

      post.comments.unshift(newComment);

      await post.save(); // [d]
      res.json(post.comments); // [e]
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Delete a comment of a post
 * @webpage ?
 * @action  deleteComment
 * @access  Private
 * @returns {Json} documento del post
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi `check` di `express-validator` per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se il valore `text` presente nel body della request NON rispetta
 *     i controlli del middleware `express-validator` ritorna un errore.
 * [b] Cerca il documento User tramite user.id ricevuto dal token jwt.
 * [c] Crea il documento Post con:
 *       1. il valore di `text` present nel body
 *       2. i valori `name`,`avatar`, presei dal documento User
 *       3. il valore `id` dell' user estrapolato dal token
 * [d] salva il nuovo documento.
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password'); // [d]
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id); // [e]

    post.comments.splice(removeIndex, 1); // [e]
    await post.save(); // [e]
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/posts/like/:id
 * @desc    Like a post
 * @webpage ?
 * @action  addLike
 * @access  Private
 * @returns {Json} Array di oggetti: liked=[{_id,user},{_id,user},..]
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il documento Post tramite il suo id passato nell'url.
 * [c] Filtra ogni oggetto dell'array post.likes per evitare
 *     che un utente metta piu di un like allo stesso post:
 *       [d] Se l'id della prop user di un oggetto è
 *           uguale all' id dell' user presente nel token jwt vuol
 *           dire che questo specifico user ha già messo un like e
 *           quindi non ne puo mettere un altro.
 *       [e] Se invece tra gli oggetti non si trova
 *           un userid uguale all'id del token viene
 *           inserito il nuovo oggetto like con 2 prop:
 *             _id(id inserito automaticamente dal db) e
 *             user(id dell'user preso dal token)
 * [d] salva il nuovo documento.
 */
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // [a]

    const num = post.likes.filter(like => like.user.toString() === req.user.id)
      .length; // [c]
    if (num > 0) {
      return res.status(400).json({ msg: 'Post already liked' }); // [d]
    } // [c]

    post.likes.unshift({ user: req.user.id }); // [e]
    await post.save(); // [e]
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT api/posts/unlike/:id
 * @desc    Unlike a post
 * @webpage ?
 * @action  removeLike
 * @access  Private
 * @returns {Json} Array di oggetti: liked=[{_id,user},{_id,user},..]
 * Rimuovere il like a un post se l'utente lo aveva già messo
 * argomento 2:
 *   middleware: auth jwt
 * [a] Cerca il documento Post tramite il suo id passato nell'url.
 * [c] Filtra ogni oggetto dell'array post.likes per trovare
 *     il like che un utente ha messo al stesso post:
 *       [d] Se l' id dell' user presente nel token jwt non
 *           è uguale a nessun id della prop user di tutti
 *           gli oggetto presenti nell'array likes
 *           vuol dire che questo specifico user non ha
 *           ancora messo un like e quindi non bisogna
 *           rimuovere il suo like perchè non esiste.
 *           Se invece il like c'è allora bisogna trovare l'oggetto
 *           da eliminare.
 *       [e] Con `indexOf` si ottiene l'indice dell'oggetto
 *           da eliminare nell'array likes. Passando l'indice
 *           in `splice` l'oggetto viene rimosso dall'array
 * [d] salva il nuovo documento.
 */
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // [a]

    const num = post.likes.filter(like => like.user.toString() === req.user.id)
      .length; // [c]
    if (num === 0) {
      return res.status(400).json({ msg: 'Post ha not yet been liked' }); // [d]
    } // [c]

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id); // [e]

    post.likes.splice(removeIndex, 1); // [e]
    await post.save(); // [e]
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
