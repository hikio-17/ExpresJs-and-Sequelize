const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

require('dotenv').config('');

const corsOptions = {
  origin: 'http://loclahost:3000',
};

/** MIDDLEWARE */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** SETUP FOLDER VIEWS */
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static('src/assets'));
app.set('view engine', 'ejs');

const db = require('./src/app/models');

/** CONNECT TO DB */
db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

/** DEFAULT ROUTE */
app.get('/', (req, res) => {
  res.send('<h3>Welocme to API Biodata</h3>');
});

const biodataRoutes = require('./src/app/routes/biodata.router');
const biodataViewsRoutes = require('./src/app/routes/biodata.router.views');

app.use('/api', biodataRoutes);
app.use('/api/views', biodataViewsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
