// const users = require('../u.json');
const fs = require('fs');
const users = [
  {
    "passport": 123454311,
    "cash": 600,
    "credit": 500,
    "isActive":false
  },
  {
    "passport": 123454312,
    "cash": 700,
    "credit": 500,
    "isActive":false
  },
  {
    "passport": 123454313,
    "cash": 800,
    "credit": 500,
    "isActive":true
  }
]



const addUser = (req, res) => {

  const { passport, cash, credit } = req.body;

  let result = users.find((u) => {
    return u.passport == passport;
  })


  if (!passport) {
    return res.status(204).json({ error: "please enter passport number" })
  } else if (passport < 100000000 || isNaN(passport)) {
    return res.status(200).json({ error: 'passport must include 9 numbers with no space' })
  } else if (result) {
    return res.status(200).json({ error: 'user exist in db' })
  } else if (cash < 0 || credit < 0) {
    return res.status(200).json({ error: 'credit and cash must be zero or more' })
  }

  const usersjson = {
    passport,
    cash,
    credit,
    isActive
  }


  // fs.readFile("./u.json", 'utf8', function readFileCallback(err, data) {
  //   if (err) {
  //     res.writeHead(404);
  //     res.write('File not found');
  //   } else {
  //     users = JSON.parse(data);
  //     users.users.push(usersjson.data);
  //     json = JSON.stringify(users);
  //     fs.writeFile("./u.json", json, function (err) {
  //       if (err) {
  //         res.writeHead(404);
  //         res.write('File not found');
  //       }

  //     });
  //   }
  // });


  users.push(usersjson);
  return res.status(200).json({ usersjson })

}


const getUsers = (req, res) => {
  // fs.readFile("./u.json", null, function (error, data) {
  //   if (error) {
  //     res.writeHead(404);
  //     res.write('File not found');
  //   } else {
  //     res.writeHead(200, { 'Content-Type': 'application/json' })
  //     res.end(JSON.stringify(users));
  //   }

  // })

  return res.send(users);
}


const getUsersBypassport = (req, res) => {
  const  passport  = req.query.passport;

  let user = users.find((u) => {
    return u.passport == passport;
  })

  if (!user) {
    res.status(200).send("user not exisist")
  }
  return res.status(200).json({ user: user })
}

const getUsersBycash = (req, res) => {
  const cash =  req.query.cash;
  let user = users.find((u) => {
    return u.cash == cash;
  })

  if (!user) {
    res.status(200).send("user not exisist")
  }
  return res.status(200).json({ user: user })
}

const getUsersByactive = (req, res) => {
  const isActive =  req.query.isActive=="true";
  let user = users.find((u) => {
    return u.isActive == isActive;
  })

  if (!user) {
    res.status(200).send("user not exisist")
  }
  return res.status(200).json({ user: user })
}

const getUsersByactiveAndcash = (req, res) => {
  const isActive =  req.query.isActive=="true";
  const cash = req.query.cash
  let user = users.find((u) => {
    if ( u.isActive == isActive){
       u.cash == cash;
    }
   
  })

  if (!user || !cash) {
    res.status(200).send("user not exisist")
  }
  return res.status(200).json({ user: user })
}

const putDeposit = (req, res) => {
  const { passport } = req.params;
  const { cash } = req.body;


  if (!cash || passport < 0) {
    res.status(204).send("error")
  } else if (cash < 0) {
    res.status(200).send("deposit possitive num")
  }

  let user = users.find((u) => {
    return u.passport == passport
  })

  if (!user) {
    res.status(204).send("error")
  }


  user.cash = user.cash + cash;
  res.status(200).send({ user: user })

}

const putCredit = (req, res) => {
  const { passport } = req.params;
  const { credit } = req.body;


  if (!credit || passport < 0) {
    res.status(204).send("error")
  } else if (credit < 0) {
    res.status(200).send("credit possitive num")
  }

  let user = users.find((u) => {
    return u.passport == passport
  })

  if (!user) {
    res.status(204).send("error")
  }


  user.credit = credit;
  res.status(200).send({ user: user })

}


const putWithdrawMoney = (req, res) => {
  const { passport } = req.params;
  const { cash } = req.body;


  if (!cash || passport < 0) {
    res.status(200).send("error ")
  } 
  let user = users.find((u) => {
    return u.passport == passport
  })

  if (!user) {
    res.status(200).send("error is no user? ")
  } else if ((user.cash+ user.credit)-cash<0) {
    return res.status(200).json("no mony to withdrow")
  }

  
  user.cash = user.cash - cash;
  

  res.status(200).send({ user: user })

}


const transferMoney = (req, res) =>{
  const { passport } = req.params;
  const {traunsferPassport, cash} = req.body;
 
  
  let user = users.find((u) => {
    return u.passport == passport
  })

  let transferedUser= users.find ((u)=>{
    return u.passport == traunsferPassport
  })

  if (!user || !transferedUser) {
    res.status(200).send("no user with that passport")
    
  }else if ((user.cash + user.credit-cash) < 0) {
    res.status(200).send("no mony to transform")
    console.log(user.cash);
    console.log(user.credit);
  }
  
  transferedUser.cash= transferedUser.cash+cash;
  user.cash -= cash;
  res.status(200).send({ transferedUser: transferedUser })

}





const deletUsers = (req, res) => {
  const { } = req.body;


}










module.exports = {
  addUser,
  getUsers,
  deletUsers,
  getUsersBypassport,
  putDeposit,
  putCredit,
  putWithdrawMoney,
  transferMoney,
  getUsersBycash,
  getUsersByactive,
  getUsersByactiveAndcash
}