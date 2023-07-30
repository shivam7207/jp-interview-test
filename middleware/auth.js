const authentication = async (req, res, next) => {
    const user = req.session.user
    const users = req.session.users
    console.log(req.session)
    if (user) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = authentication