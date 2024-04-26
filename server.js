const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Adatok fogadása és mentése a JSON fájlba
app.post('/receive-data', (req, res) => {
  const data = req.body;
  console.log('XXX Received data:', data); // Add console log here
  fs.writeFile('data.json', JSON.stringify(data), (err) => {
      if (err) {
          console.error('Hiba történt az adatok mentésekor:', err);
          res.status(500).send('Hiba történt az adatok mentésekor');
      } else {
          console.log('Adatok sikeresen mentve');
          res.status(200).send('Adatok sikeresen mentve');
      }
  });
});


// Adatok visszaolvasása a JSON fájlból
app.get('/get-data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Hiba történt az adatok olvasásakor:', err);
            res.status(500).send('Hiba történt az adatok olvasásakor');
        } else {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`A szerver fut a http://localhost:${PORT} címen`);
});
