const Sequelize = require ('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/react')
const express = require('express')
const app = express()
const path = require('path')

const Team = sequelize.define ('team',  {
  name: {
    type: Sequelize.STRING,
  }
})

app.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'))
  }
  catch (e) {
    console.log(e)
  }
})

app.get('/api/teams', async (req, res) => {
  try {
    res.send(await Team.findAll())
  }
  catch (e) {
    console.log(e)
  }
})

app.delete('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id)
    await team.destroy();
    res.sendStatus('204')

  }
  catch (e) {
    console.log(e)
  }
})

const init = async() => {
  try {
    await sequelize.sync({force:true})
    await Team.create({name: "Lakers"})
    await Team.create({name: "Clippers"})
    await Team.create({name: "Warriors"})

    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`listening on port ${port}`))
  }
  catch (e) {
    console.log(e)
  }
}

init()