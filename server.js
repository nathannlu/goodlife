const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema');
const graphQLResolvers = require('./graphql/resolvers');

// Enviornment variables
require('dotenv').config();

const app = express();

app.use(
	cors(),	
	bodyParser.urlencoded({extended: false}),
	bodyParser.json()
);

app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphQLSchema,
		rootValue: graphQLResolvers, 
		graphiql: true
	})
);

const database = process.env.MONGO_URI || ''
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(
  async connection => {
    console.log('Database loaded and connected.')
  }
)


app.listen(process.env.PORT || 5000, ()=> {
	console.log('Server started.');
})
