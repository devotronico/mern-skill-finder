const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
// Body parser
// @see: https://expressjs.com/en/api.html#express.json
app.use(express.json({ extended: false }));

/// Enable cors
app.use(cors());

/// Riga da disattivare al momento del deploy
// app.get('/', (req, res) => res.send('API Running'));

/**
 * Define Routes
 * parametro 1:api url. es: http://localhost:5000/api/users
 * parametro 2:percorso file del codice che gestisce la logica
 */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/logs', require('./routes/api/logs'));
// app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
