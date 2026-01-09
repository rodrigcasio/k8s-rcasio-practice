const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static('public')); 

app.get('/', (req, res) => {

  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading template');
    }

    const message = process.env.APP_MESSAGE || "Welcome to Version 6.0";
    const podName = os.hostname();

    let result = data.replaceAll('{{MESSAGE}}', message);
    result = result.replaceAll('{{POD_NAME}}', podName);

    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`App v6 listening at http://localhost:${PORT}`);
});
