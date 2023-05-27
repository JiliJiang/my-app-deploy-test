const express = require('express');

const PORT = process.env.PORT || 3003;
const app = express();
const apiRoute = require('./routes/apiRoute.js');
const htmlRoute = require('./routes/htmlRoute.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoute);
app.use('/', htmlRoute);


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
