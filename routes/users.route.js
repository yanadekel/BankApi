const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const fs = require('fs');


router.post('/', (req, res) => {
  usersController.addUser(req, res);
  
}).get('/', (req, res) => {
  usersController.getUsers(req, res);

}).get('/:passport', (req, res) => {
  usersController.getUsersBypassport(req, res);

}).put('/:passport/deposit',(req,res)=>{
 usersController.putDeposit(req, res)

}).put('/:passport/credit',(req,res)=>{
  usersController. putCredit(req, res)

 }).put('/:passport/withdraw',(req,res)=>{
  usersController.putWithdrawMoney(req, res)

}).put('/transfer/:passport',(req,res)=>{
  console.log("Transfer Route ")
  // console.log(url.parse(req.url, true))
  console.log(req.params.passport)
  console.log(req.body.traunsferPassport)
  console.log(req.body.cash)
  usersController.transferMoney(req, res)
 })

.delete('/',  (req, res)=>{
  usersController.deletUsers(req, res);
} )







module.exports = router;