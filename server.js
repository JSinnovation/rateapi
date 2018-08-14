const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');


const app = express();

 

mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGODB);

app.use(helmet());
app.use(compression());


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
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());
const user = require('./routes/userRoute');
const company = require('./routes/companyRoute');
const file = require('./routes/fileRoute');

app.use('/api', user);
app.use('/api', company);
app.use('/api', file);
/* const host = '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, function() {
    console.log("Server started.......");
  }); */
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});  
 

/* 
app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port "+ process.env.PORT);
}); 
 */
