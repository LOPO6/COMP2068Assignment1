import express from 'express';
import bodyParser from 'body-parser'

//swagger for api docs
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

//import cors
import cors from 'cors';

import path from 'path';

//controllers
import shoesController from './controllers/shoes.js';

const app = express();
//test

app.use(bodyParser.json());


 // get public path for angular client app
const __dirname = path.resolve();
app.use(express.static(`${__dirname}/public`));

//swagger config
const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Shoes API',
            version: '1.0.0'
        }
    },
    apis: ['./controllers/*.js'] //where to find the api stuff
};

const openapiSpecification = swaggerJSDoc(docOptions); //creating api specification
app.use('/shoes-api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification)); //setting it up

//cors: allow angular client http access
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}));



mongoose.connect(process.env.DB,{})
.then((res)=>console.log("Connected to MongoDB"))
.catch((err) => console.log(`Connection Failure: ${err}`));


//url dispatching
app.use('/api/v1/shoes', shoesController);
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });




//start web server
app.listen(3000,()=> {
    console.log('Express API running on port 3000')
});

