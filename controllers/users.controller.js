const users = require('../users.json');
const fs = require('fs');
// const users = [
//   {
//     "passport": 1234543,
//     "cash": 0,
//     "credit": 0
//   }
// ]



const addUser = (req, res) => {
  const { passport, cash, credit } = req.body;

  let result = users.users.find((u) => {
    return u.passport == passport;
  })



  if (!passport || !cash || !credit) {
    return res.status(204).json({ error: "please enter passport number" })
  } else if (passport < 100000000 || isNaN(passport)) {
    return res.status(200).json({ error: 'passport must include 9 numbers with no space' })
  } else if (result) {
    return res.status(200).json({ error: 'user exist in db' })
  } else if (cash < 0 || isNaN(cash) || credit < 0 || isNaN(credit)) {
    return res.status(200).json({ error: 'credit and cash must be zero or more' })
  }

  const usersjson = {
    passport,
    cash,
    credit,
  }


  fs.readFile("./users.json", 'utf8', function readFileCallback(err, data) {
    if (err) {
      res.writeHead(404);
      res.write('File not found');
    } else {
      // users = JSON.parse(data);
      users.users.push(usersjson.data);
      json = JSON.stringify(users); 
      fs.writeFile("./users.json", json);
    }
  });





  return res.status(200).json({ usersjson: usersjson })

}


const getUsers = (req, res) => {
  fs.readFile("./users.json", null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users));
    }

  })
}

const deletUsers = (req, res)=> {
  const {} = req.body;
  

}










module.exports = {
  addUser,
  getUsers,
  deletUsers

}