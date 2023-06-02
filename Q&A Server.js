const express = require('express');
const openai = require('openai');

openai.apiKey = 'sk-20APWGn38hXioxDBxCD7T3BlbkFJhSyhgG';

const app = express();

app.post('/generate-answer', async (req, res) => {
  const question = req.body.question;

  try {
    const result = await openai.Completion.create({
      engine: 'text-davinci-003',
      prompt: question,
      maxTokens: 60,
    });

    res.send(result.data.choices[0].text.trim());
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
