const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.post('/receive-data', (req, res) => {
  let data = '';

  req.on('data', chunk => {
    data += chunk.toString();
  });

  req.on('end', () => {
    console.log('Fogadott adatok:');
    console.log(data);

    res.json({ diskInfo: data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen`);
});
