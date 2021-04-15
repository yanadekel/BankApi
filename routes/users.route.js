const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');


router.post('/', (req, res) => {
  usersController.addWorker(req, res);
})







module.exports = router;