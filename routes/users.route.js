const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const fs = require('fs');


router.post('/', (req, res) => {
  usersController.addUser(req, res);
  
}).get('/', (req, res) => {
  usersController.getUsers(req, res);
}).delete('/',  (req, res)=>{
  usersController.deletUsers(req, res);
} )







module.exports = router;