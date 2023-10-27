import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { routes } from './routes';


dotenv.config(); // Cria as variáveis escrita no arquivo .env
const app: Express = express(); // Cria a variável do servidor


// app.use() altera alguma configuração do app
app.use(cors());
app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || '3000';
const USE_TEST_ENV = process.env.USE_TEST_ENV === 'true';

if (!USE_TEST_ENV) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (USE_TEST_ENV = ${USE_TEST_ENV})`);
  });
}

export { app, USE_TEST_ENV, PORT };
