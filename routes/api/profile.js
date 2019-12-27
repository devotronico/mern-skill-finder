const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
 * @route   GET api/profile/me
 * @desc    Get current user profile
 * @access  Private
 * @returns {Json} documento del profilo + i valori `name` e `avatar` dell'user
 * [a] `findOne` cerca tramite l'id dell'user il profilo associato all' user
 *     `populate` popola la prop `user` dell profilo
 *     con i valori `name` e `avatar` del doc `user`.
 * [b] Se il profilo non è stato trovato ritorna un errore.
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']); // [a]

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' }); // [b]
    }

    res.json(profile);
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route  POST api/profile
 * @desc   Create or Update user profile
 * @access Private
 * @returns {Json} documento del profilo
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi check di express-validator per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se i valori inseriti nel body della request NON rispettano i
 *     controlli del middleware `express-validator` ritorna un errore.
 * [b] Crea le variabili ottenute dal req.body.
 * <c> Costruisce l'oggetto `profileFields` inserendo i valori trovati
 *     nel req.body.
 * [d] Cerca il profilo da aggiornare tramite user.id ricevuto
 *     dal token jwt, se lo trova lo aggiorna.
 * [e] Se il profilo non è stato trovato vuol dire che non esiste
 *     ancora un profilo associato all'user, quindi il profilo
 *     viene creato
 */
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // [a]

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body; // [b]

    const profileFields = {}; // <c> Build profile object
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {}; // Build social object
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    // <c>

    try {
      let profile = await Profile.findOne({ user: req.user.id }); // [d]
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ); // [e] Update

        return res.json(profile);
      }

      profile = new Profile(profileFields); // [e] Create
      await profile.save(); // [e] Create
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }

    res.send('OOOOKKK'); // per test?
  }
);

/**
 * @route  GET api/profile
 * @desc   Get all Profiles
 * @access Public
 * @returns {Json} Array di profili
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Get Profile by user ID
 * @access  Public
 * @returns {Json} documento del profilo
 * argomento 2: middleware auth jwt
 * [d] Cerca il profilo da mostrare tramite user.id ricevuto
 *     come parametro dell' url
 *     Con `populate` aggiunge al file json di ritorno i valori
 *     'name', 'avatar' all'interno dell'oggetto user
 */
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route  DELETE api/profile
 * @desc   Delete profile, user and posts
 * @access Private
 * @returns {Json} messaggio di successo
 * Cancella un documento user e i documenti associati ad esso(profile, posts)
 * argomento 2: middleware: auth jwt
 * [c] Cancella tutti i post dell'user
 * [a] Cerca il documento Profile da cancellare
 *     tramite user.id ricevuto dal token jwt.
 * [b] Cerca il documento User da cancellare
 *     tramite user.id ricevuto dal token jwt.
 */
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user_id });
    await User.findOneAndRemove({ _id: req.user_id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route  PUT api/profile/experience
 * @desc   Add a new object in profile.experience[]
 * @access Private
 * @returns {Json} documento del profilo
 * Inserisce nell' array experience del documento profile
 * un nuovo oggetto experience
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi check di express-validator per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se i valori inseriti nel body della request NON rispettano i
 *     controlli del middleware `express-validator` ritorna un errore.
 * [b] Crea le variabili ottenute dal req.body.
 * [c] Costruisce l'oggetto `newExp` inserendo i valori trovati
 *     nel req.body.
 * [d] Cerca il profilo da aggiornare tramite user.id ricevuto
 *     dal token jwt.
 * [e] inserisce nell'array experience del documento profile
 *     un nuovo oggetto con i valori:
 *     title,company,location,from,to,current,description
 * [f] salva il documento aggiornato.
 */
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // [a]

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body; // [b]

    const newExp = { title, company, location, from, to, current, description }; // [c]

    try {
      const profile = await Profile.findOne({ user: req.user.id }); // [d]
      profile.experience.unshift(newExp); // [e]
      await profile.save(); // [f]
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/profile/experience/:exp_id
 * @desc    Delete a single experience from profile
 * @access  Private
 * @returns {Json} documento del profilo
 * argomento 2: middleware: auth jwt
 * [a] Con l' user.id ricevuto dal token jwt,
 *     cerca il profilo dal quale rimuovere un elemento experience
 * [b] cerca nell'array experience l'id del elemento experience da eliminare
 *     l'id del elemento experience da eliminare viene passato nell url
 * [c] elimina l'elemento experience.
 * [d] salva il documento aggiornato
 */
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }); // [a]

    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.param.exp_id); // [b]
    profile.experience.splice(removeIndex, 1); // [c]
    await profile.save(); // [d]
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error 1');
  }
});

/**
 * @route  PUT api/profile/education
 * @desc   Add a new object in profile.education[]
 * @access Private
 * @returns {Json} documento del profilo
 * Inserisce nell' array education del documento profile
 * un nuovo elemento education
 * argomento 2:
 *   middleware: auth jwt
 *   middleware: array di metodi check di express-validator per
 *   settare i controlli di validità dei valori inseriti dall'utente.
 * [a] Se i valori inseriti nel body della request NON rispettano i
 *     controlli del middleware `express-validator` ritorna un errore.
 * [b] Crea le variabili ottenute dal req.body.
 * [c] Costruisce l'oggetto `newEdu` inserendo i valori trovati
 *     nel req.body.
 * [d] Cerca il profilo da aggiornare tramite user.id ricevuto
 *     dal token jwt.
 * [e] inserisce nell'array experience del documento profile
 *     un nuovo oggetto con i valori:
 *     school,degree,fieldofstudy,from,to,current,description
 * [f] salva il documento aggiornato
 */
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); // [a]
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // [a]

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body; // [b]

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }; // [c]

    try {
      const profile = await Profile.findOne({ user: req.user.id }); // [d]
      profile.education.unshift(newEdu); // [e]
      await profile.save(); // [f]
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   DELETE api/profile/education/:edu_id
 * @desc    Delete education from profile
 * @access  Private
 * @returns {Json} documento del profilo
 * argomento 2: middleware: auth jwt
 * [a] Con l' user.id ricevuto dal token jwt,
 *     cerca il profilo dal quale rimuovere un elemento experience
 * [b] cerca nell'array experience l'id del elemento experience da eliminare
 *     l'id del elemento experience da eliminare viene passato nell url
 * [c] elimina l'elemento experience.
 * [d] salva il documento aggiornato
 */
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }); // [a]

    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.param.edu_id); // [b]
    profile.education.splice(removeIndex, 1); // [c]
    await profile.save(); // [d]
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/profile/github/:username
 * @desc    Get user repos from Github
 * @access  Public
 * @returns {Json} documento del profilo
 * argomento 2: middleware: auth jwt
 * [a] Con l' user.id ricevuto dal token jwt,
 *     cerca il profilo dal quale rimuovere un elemento experience
 * [b] cerca nell'array experience l'id del elemento experience da eliminare
 *     l'id del elemento experience da eliminare viene passato nell url
 * [c] elimina l'elemento experience.
 * [d] salva il documento aggiornato
 */
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error 1');
  }
});

/**
 * @route  GET api/profile
 * @desc   Get Profiles by skills
 * @access Public
 * @returns {Json} Array di profili
 */
router.post('/skills', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    const strFilter = req.body.skills;
    // const strFilter = "HTML,Css";

    const arrFilter = strFilter
      .toLowerCase()
      .split(',')
      .map(skill => skill.trim());

    const filtered = profiles.filter(item =>
      arrFilter.some(r =>
        item.skills
          .join()
          .toLowerCase()
          .includes(r)
      )
    );

    const regexFilter = strFilter.replace(',', '|');
    const regex = new RegExp(regexFilter, 'gi');
    const mod = filtered.map(item => {
      item.skills = item.skills.join().replace(regex, item => `<p>${item}</p>`);
      return item;
    });

    res.json(mod);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
