const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression')

const app = express();

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB);

app.use(helmet());
app.use(compression);
//adds the middleware helmet and compression

require('./passport/passport-local');

app.use(cors()); 

app.use((req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session()); 
/* 
//error suppression below
app.on('unhandledRejection', error => {
    // Won't execute
    console.log('unhandledRejection', error.test);
  });
  
  new Promise((_, reject) => reject({ test: 'woops!' })).catch(() => {});

 */

const user = require('./routes/userRoute');
const company = require('./routes/companyRoute');
const file = require('./routes/fileRoute');

app.use('/api', user);
app.use('/api', company);//use middleware
 app.use('/api', file); 
app.listen(3000, () => {
    console.log('Server running on port 3000');
})

 

/* app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000'); 
})

 */ 