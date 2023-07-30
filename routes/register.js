const express = require('express')
const router = express.Router()
const User = require('../models/user')
const session = require('express-session')

router.post('/', async (req, res) => {

    email = req.body.email
    password = req.body.password
    username = req.body.password
    phone = req.body.phone

    try {

        const isRegisteredIsBeingUsed = await User.findOne({
            $or: [
              { email },
              { phone },
              { username }
            ]
          });

        if(isRegisteredIsBeingUsed){
            return res.status(404).json({ message: "creds alredy registered" })
        }
          
        if (!email || !password) {
            return res.status(404).json({ message: "missing fields" })
        }

        const saveUser = await new User(req.body)
        saveUser.save()
        req.session.user = saveUser
        console.log(req.session)
        console.log(saveUser)
        if (saveUser) {
            return res.status(200).json(saveUser)
        } else {
            return res.status(500).json({ message: "something went wrong" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).status({ message: "Internal server error" })
    }

})

module.exports = router