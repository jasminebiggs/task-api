import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',            // Local Swagger
    'https://task-api-x9sf.onrender.com' // Render-hosted API
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('🚀 Task API is running successfully!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

