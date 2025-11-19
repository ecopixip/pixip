require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const leadRoutes = require('./routes/leadRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend PIXIP rodando na porta ${PORT}`));
