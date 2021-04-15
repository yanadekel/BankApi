// const users = require('../users.json');
const users = [
  {
    "passport": 1234543,
    "cash": 0,
    "credit": 0
  }
]





const addUser = (req, res) => {
  const { passport, cash, credit } = req.body;

  let result = users.find((u) => {
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
    cash: cash,
    credit: credit
  }

  users.push(usersjson);
  return res.status(200).json({ usersjson: usersjson })
}

module.exports = {
  addUser,

}