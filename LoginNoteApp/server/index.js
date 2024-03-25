const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Import yamljs package
const swaggerSpec = YAML.load('./combined_swagger.yaml'); // Load Swagger YAML file
require('dotenv').config(); // Load environment variables

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
.then(() => console.log('DB is connected'))
.catch((err) => console.log('Error establishing connection', err));

// Routes
const noteRoute = require('./routes/noteRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
app.use('/api/user', authRoute);
app.use('/api/notes', noteRoute);
app.use('/api/user', userRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
