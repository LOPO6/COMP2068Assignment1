import express from 'express';
import bodyParser from 'body-parser'

//swagger for api docs
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

//controllers
import shoesController from './controllers/shoes.js';

const app = express();

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification)); //setting it up

//db connect
mongoose.connect(process.env.DB,{})
.then((res)=>console.log("Connected to MongoDB"))
.catch((err) => console.log(`Connection Failure: ${err}`));
//url dispatching
app.use('/api/v1/shoes', shoesController);
app.use(bodyParser.json())

//start web server
app.listen(3000,()=> {
    console.log('Express API running on port 3000')
});

