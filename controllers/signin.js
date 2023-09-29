const handleSignin = (req, res, db, bcrypt) => {
    const {name, password} = req.body;
    if (!name || !password) {
        return res.status(400).json("Missing information")
    }
    db.select('name', 'hash').from('login')
    .where('name', '=', name)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('name', '=', name)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Combination not found')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}