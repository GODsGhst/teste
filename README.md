# Conversor de Moedas Simples (Node.js + Express)

API backend simples para converter moedas usando a API externa da **CurrencyDataFeed**.

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie o `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

3. Coloque sua chave no `.env`:

```env
CURRENCY_DATAFEED_API_KEY=sua_chave
PORT=3000
```

4. Inicie o servidor:

```bash
npm start
```

## Endpoint

### `GET /convert`

Parâmetros de query:
- `from`: moeda origem (ex.: `USD`)
- `to`: moeda destino (ex.: `BRL`)
- `amount`: valor (ex.: `100`)

Exemplo:

```http
GET /convert?from=USD&to=BRL&amount=100
```

Resposta: retorna os dados da API externa junto com o contexto da requisição.
