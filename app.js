const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const { morganMiddleware } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const indexRouter = require('./routes/index.routes');
const companyRoutes = require('./routes/company.routes'); // Path to the routing file
const complaintRoutes = require('./routes/complaint.routes'); // Path to the routing file
const commonRoutes = require('./routes/common.routes'); // Path to the routing file

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morganMiddleware);
app.use(errorHandler);
app.use('/api', indexRouter);
app.use('/api', companyRoutes);
app.use('/api', complaintRoutes);
app.use('/api', commonRoutes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Start the server


const PORT = process.env.PORT || 3000;


// Use the company routes
// Default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Company API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



