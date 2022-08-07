const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { Users } = require('./db/models');


const authRoute = require('./routes/auth');

const http = require('http');
const { v4: uuidv4 } = require('uuid');
const { WebSocketServer } = require('ws');

const bookingRouter = require('./routes/booking');
const userRouter = require('./routes/userRouter');
const adminRoute = require('./routes/admin');

const app = express();
const map = new Map();

const PORT = process.env.PORT || 3001;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'https://elbrus-state.herokuapp.com/auth/github/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
      const response = await Users.findOrCreate({
        where: { githubId: profile.id, name: profile.displayName },
      });
      console.log('GitHubStrategy', response);
      return done(null, response[0]);
    }
  )
);



app.use(
  session({
    name: 'sid',
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/auth', authRoute);
app.use('/booking', bookingRouter);
app.use('/admin', adminRoute);
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


const server = http.createServer(app);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  session({
    name: 'sid',
    store: new FileStore({}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })(request, {}, () => {
    // if (!request.session.userId) {
    //   socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    //   socket.destroy();
    //   return;
    // }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

// part 2
wss.on('connection', (ws, request) => {
  const userId = request.session.userId || uuidv4();

  map.set(userId, ws);

  ws.on('message', (message) => {
    console.log(map.size);
    const dataFromClient = JSON.parse(message);
    console.log('message --->>', dataFromClient, userId);
    switch (dataFromClient.type) {
      case 'formData':
        for (const [userId, clientWs] of map) {
          clientWs.send(JSON.stringify(dataFromClient.payload));
        }
        break;
      case 'join':
        for (const [userId, clientWs] of map) {
          clientWs.send(JSON.stringify(dataFromClient.payload));
        }
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    map.delete(userId);
  });
});

server.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
