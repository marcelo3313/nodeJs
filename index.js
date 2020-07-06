const express = require('express');
const fs = require('fs').promises;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'NodeJs Test API',
      description: 'homework 6 for nodeJs mentorship',
      contact: {
        name: 'Maliuk Marko'
      },
      servers: ['http://localhost:3000']
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: {
      bearerAuth: [],
    }
  },
  apis: ['index.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger 
 * /users:
 *  get:
 *    description: Gets all users data
 *    responses: 
 *      '200':
 *        - desctiption: Successfull response
 *    security: 
 *      - bearerAuth: []
 */
app.get('/users', async (req, res) => {
  res.send(await getData());
})

/**
 * @swagger 
 * /users/add:
 *  post:
 *    description: Adds new user
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *             - email
 *           properties:
 *             userName:
 *               type: string
 *             email:
 *               type: string
 *    security:
 *        - bearerAuth: []
 *    responses: 
 *      '200':
 *        desctiption: Successfull response
 */
app.post('/users/add', async (req, res) => {
  try {
    const data = await getData();
    const id = data.length + 1;
    const userName = req.body.userName;
    const email = req.body.email;

    if (!userName || !email) {
      res.status(400).send('Please provide full user information')
    } else {
      data.push({id, userName, email});
      await writeData(data);
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.end();
  }

})

app.listen(3000);

async function getData() {
  const data = await fs.readFile(`${__dirname}/database/data.json`);
  return JSON.parse(data);
}

async function writeData(content) {
  return fs.writeFile(`${__dirname}/database/data.json`, JSON.stringify(content));
}