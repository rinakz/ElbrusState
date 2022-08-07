const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');
require('dotenv').config();

router.get('/check', async (req, res) => {
  try {
    console.log('=========================================', req.session);
    if (req.session.userId) {
      const result = await Users.findByPk(req.session.userId);
      res.json(result);
    } else if (req.session.passport.user) {
      const result = await Users.findByPk(
        req.session.req.session.passport.user.id,
      );
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    const result = await Users.create({
      email,
      name,
      password: await bcrypt.hash(password, +process.env.SALTROUNDS),
    });
    console.log('123');
    if (result.id) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      req.session.userRole = result.role_id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body, 'fffffffffffffffffffffffffffff');
  try {
    const { email, password } = req.body;
    const result = await Users.findOne({ where: { email } });
    console.log(result);
    if (await bcrypt.compare(password, result.password)) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      req.session.userRole = result.role_id;
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
