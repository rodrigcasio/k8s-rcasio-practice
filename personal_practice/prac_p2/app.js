const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static('public')); // find .css from public/ automatically

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');

  // read file 
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading page');
    }

    // replace palceholders with real values:
    const message = process.env.APP_MESSAGE || "Welcome to Version 4.0";
    const podName = os.hostname();
    
    let result = data.replace('{{MESSAGE}}', message)
                     .replace('{{POD_NAME}}', podName);

    res.send(result);

  });
});

app.listen(PORT, () => {
  console.log(`App v2 listening at http://localhost:${PORT}`);
})
