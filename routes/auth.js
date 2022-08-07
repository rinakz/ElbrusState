const router = require('express').Router();

const passport = require('passport');

const CLIENT_URL = 'https://elbrus-state.herokuapp.com/main';

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login/failed'
  }), function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
