
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to generate resume summary and key skills
app.post('/generate', async (req, res) => {
  const { experience } = req.body;

  if (!experience) {
    return res.status(400).json({ error: 'Experience is required' });
  }

  try {
    const prompt = `Suggest a professional resume summary and key skills for this experience: ${experience}`;

    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'phi',
      prompt: `Generate resume suggestions based on the following experience:\n\n${experience}`,
      stream: false,
    });

    res.json({ suggestion: response.data.response });
  } catch (err) {
    console.error('Ollama Error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to generate suggestion from Ollama' });
  }
});

// Simple status route
app.get('/', (req, res) => {
  res.send('🚀 Ollama-powered AI Resume Builder is running!');
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
