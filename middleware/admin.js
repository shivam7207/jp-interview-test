const adminAuthentication = async (req, res, next) => {
    const user = req.session.user
    if (user?.isAdmin ===  true) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = adminAuthentication