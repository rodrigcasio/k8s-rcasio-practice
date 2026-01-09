const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error: public/index.html not found.');
    }

    // logic for ConfigMap (APP_MESSAGE) and Pod Name (os.hostname)
    const message = process.env.APP_MESSAGE || "Welcome to Version 7.0";
    const podName = os.hostname();

    let result = data.replaceAll('{{MESSAGE}}', message);
    result = result.replaceAll('{{POD_NAME}}', podName);

    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
