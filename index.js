const express = require('express');
const app = express();
const port = 3000;

// Debugging: Log the import to ensure it's correct
const summarizeText = require('./summarize.js');
console.log('summarizeText:', summarizeText); // This should log the function

app.use(express.json());
app.use(express.static('public'));

app.post('/summarize', async (req, res) => {
  const text = req.body.text_to_summarize;

  try {
    const summary = await summarizeText(text);
    res.send(summary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while summarizing the text.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
