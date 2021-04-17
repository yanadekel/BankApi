const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const fs = require('fs');


router.post('/', (req, res) => {
  usersController.addUser(req, res);

}).get('/', (req, res) => {
  usersController.getUsers(req, res);

}).get('/searchBy', (req, res) => {
  if (req.query.cash) {
    usersController.getUsersBycash(req, res);
  }else if (req.query.passport) {
    usersController.getUsersBypassport(req, res);
  }else if (req.query.isActive) {
    usersController.getUsersByactive(req, res);
  }else {
    res.status(404).send("error")
  }
 

}).put('/:passport/deposit', (req, res) => {
  usersController.putDeposit(req, res)

}).put('/:passport/credit', (req, res) => {
  usersController.putCredit(req, res)

}).put('/:passport/withdraw', (req, res) => {
  usersController.putWithdrawMoney(req, res)

}).put('/transfer/:passport', (req, res) => {
  usersController.transferMoney(req, res)

})

  .delete('/', (req, res) => {
    usersController.deletUsers(req, res);
  })







module.exports = router;