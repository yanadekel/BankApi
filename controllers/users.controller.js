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

  if (!passport) {
    return res.status(200).json({ error: "please enter passport number" })
  } else if (passport.length < 9 || passport.includs(' ')) {
    return res.status(200).json({ error: 'passport must includes 9 numbers with no space' })
  } else if (result) {
    return res.status(200).json({ error: 'user exist in db' })
  }

  const usersjson = {
    passport,
    cash,
    credit
  }

  users.push(usersjson);
  return res.send(usersjson);
}

module.exports = {
  addUser,

}