const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.text());
app.use(express.static('public'));

// Endpoint to receive and save data to a CSV file
app.post('/upload', (req, res) => {
  const csvData = req.body;

  // Generate a unique filename based on timestamp
  const fileName = `orientation_data_${Date.now()}.csv`;
  const filePath = path.join(__dirname, fileName); // Save in the root directory

  // Write CSV data to file
  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    } else {
      console.log(`Data saved to ${filePath}`);
      res.status(200).send('Data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
