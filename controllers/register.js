const saltRounds = 10;

const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json("Missing information")
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            name: name
        })
        .into('login')
        .returning('name')
        .then(loginName => {
            return trx('users')
            .returning('*')
            .insert({
                email: email,
                name: loginName[0].name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    handleRegister: handleRegister
}