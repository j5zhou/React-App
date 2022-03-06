const express = require('express');
const path = require('path');
const db_api = require('./database');
const app = express()
const port = 3000

//session and cookies
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));

// dealt with fetch post json data.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//dealt with static file
app.use('/static/js', express.static(path.join(__dirname, 'public/js')));
app.use('/static/css', express.static(path.join(__dirname, 'public/css')));
app.use('/static/html', express.static(path.join(__dirname, 'public/html')));
app.use('/static/images', express.static(path.join(__dirname, 'public/images')));

//dealth with request.
app.get('/', (req, res) => {
  //req.session.uid = "620de9b812aed67ee214d22a";
  console.log("uid:",req.session.uid);
  if(req.session.uid){
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
  }else{
    res.sendFile(path.join(__dirname, 'public/html/login.html'));
  }
  //res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/login.html'));
});

app.get('/logout', (req, res) => {
  req.session.uid = undefined;
  res.status(200).send({ status: 200 });
});


app.post('/signup', (req, res) => {
  const data = req.body;
  db_api.createAccount(data, (resove_data) => {
    console.log("sign up resove_data:", resove_data);
    if (resove_data.status === 201) {
      req.session.uid = resove_data.data['_id'].toString();
      console.log("signup uid:",req.session.uid);
      res.status(201).send(resove_data);
    } else if (resove_data.status === 400) {
      res.status(400).send({ status: 400, error: resove_data.message })
    }
  });
});
app.post('/userlogin', (req, res) => {
  const data = req.body;
  console.log("userlogin:", data);
  db_api.login(data, (resove_data) => {
    console.log("login resove_data:", resove_data);
    if (resove_data.status === 200) {
      req.session.uid = resove_data.data[0]['_id'].toString();
      res.status(200).send(resove_data);
    } else if (resove_data.status === 400) {
      res.status(400).send({ status: 400, error: resove_data.message })
    }
  });
});


app.post('/addRecipeToFavorite', (req, res) => {
  const data = req.body;
  console.log("user like this recipe:");
  db_api.addRecipeToFavorite({ ...data, uid: req.session.uid }, (resove_data) => {
    console.log("resove_data:", resove_data);
    if (resove_data.status === 201) {
      res.status(201).send(resove_data);
    } else if (resove_data.status === 400) {
      res.status(400).send({ status: 400, error: resove_data.message })
    }
  });
});

const deleteRecipeUri = /^\/removeRecipeFromFavorite\/[\w]+/
app.delete(deleteRecipeUri, (req, res) => {
  const id = req.url.substring(req.url.lastIndexOf("/") + 1);
  db_api.removeRecipeFromFavorite({ id: id, uid: req.session.uid }, (resove_data) => {
    console.log("resove_data:", resove_data);
    if (resove_data.status === 201) {
      res.status(201).send(resove_data);
    } else if (resove_data.status === 400) {
      res.status(400).send({ status: 400, error: resove_data.message })
    }
  });
});

app.get('/getAllFavoriteRecipes', (req, res) => {
  console.log("user want to get all his favorite recipe:");
  db_api.getAllFavoriteRecipes(req.session.uid, (resove_data) => {
    res.status(200).send(resove_data);
  });
});


//graphql examples
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice2( numDice: Int!, numSides: Int):[Int],
    rollDice(numDice: Int!, numSides: Int): [Int],
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  rollDice2:({numSides,numDice})=>{
    return [1];
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));



app.listen(process.env.PORT || 3000);