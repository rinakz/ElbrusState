const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');
require('dotenv').config();


router.get('/allusers', async (req, res) => {
  try {
    const result = await Users.findAll();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.put('/allusers/:id/:roleId', async (req, res) => {
  try {
    const { roleId } = req.params;
    const { id } = req.params;
    await Users.update({ role_id: roleId }, { where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.delete('/allusers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

module.exports = router;
