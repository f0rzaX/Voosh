const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('passport');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


dotenv.config()

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MonogDB Connected"))
    .catch(error => console.error(error));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Voosh Assignment',
            description: 'APIs for "Enhanced Authentication API" Assignment',
            contact: {
                name: 'Chetan Saini',
                email: 'chetansaini2k@gmail.com'
            },
            servers: ['http://localhost:3000']
        }
    },
    components: {
        schemas: {}
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());


require('./config/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is ON @ ${PORT}`);
});