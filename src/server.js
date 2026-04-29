const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.CURRENCY_DATAFEED_API_KEY;

app.get('/', (_req, res) => {
  res.json({
    message: 'API de conversão de moedas está no ar.',
    exemplo: '/convert?from=USD&to=BRL&amount=100'
  });
});

app.get('/convert', async (req, res) => {
  try {
    const from = (req.query.from || '').toUpperCase();
    const to = (req.query.to || '').toUpperCase();
    const amount = Number(req.query.amount);

    if (!from || !to || Number.isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        error: 'Parâmetros inválidos. Use: from, to e amount (maior que 0).'
      });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: 'API key não configurada. Defina CURRENCY_DATAFEED_API_KEY no .env.'
      });
    }

    const externalUrl = `https://api.currencydatafeed.com/data/conversion?from=${from}&to=${to}&amount=${amount}&api-key=${apiKey}`;

    const response = await fetch(externalUrl);

    if (!response.ok) {
      return res.status(502).json({
        error: 'Falha ao consultar API externa.',
        status: response.status
      });
    }

    const data = await response.json();

    return res.json({
      from,
      to,
      amount,
      resultado: data
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro interno ao converter moedas.',
      detalhes: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
