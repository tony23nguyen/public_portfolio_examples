const express = require('express')
const app = express()
const brcrypt = require('bcrypt')

app.use(express.json())

//replace this with a database
const users = []


//grabs the users
app.get('/users', (req,res) => {
    res.json(users)

})

//hash password and store it into the users object
app.post('/users', async (req, res) => {
    try{
        const hashedPassword = await brcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword} 
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send('User post error')
    }
    })

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null){
        return res.status(400).send('Cannot find user')
    }
    try{
        if(await brcrypt.compare(req.body.password, user.password)){
            res.send('success')
        } else {
            res.send('not allowed')
        }


    } catch{
        res.status(500).send()
    }


})

app.listen(3000)