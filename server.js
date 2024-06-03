/* 
  TODO:
    - Securizar todo el tema del login (contraseñas)
    - Profundizar un poco más en lo de las sessiones
    - Generate uuid en el session secret
    - Ver bien como va todo el tema del ok y error
    - Hacer un control de errores de la hostia mongodb y aquí
    - Implementar administradores y sus funciones
    - Hacer que la pagina del login sea o login o info del usuario (como listado_user)
    - Todo el tema de las reservas sigue pendiente
*/


const session = require('express-session');
const express = require('express');
const MongoDB = require('./mongodb')
const path = require('path');
const app = express();

const port = 3030;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// Ver como se hace en triage

app.listen(port, function () {
  console.log('Servidor iniciado en puerto:', port);
});

app.route('/')
.get((_req, res) => {

  return res.sendFile(path.join(__dirname, 'public', 'index.html'))

}).post(async (req, res) => {

  try{
    eventos = await MongoDB.fetch_all('eventos')
    return res.send(eventos)

  } catch (error) {
    console.log(error)
  }
})

app.route('/carta').get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'carta.html'))
}).post(async (req,res) => {

  try{
    carta = await MongoDB.fetch_all(req.body.coleccion)
    res.send(carta)
  } catch (error){
    console.log(error)
  }

})

app.route('/articulos')
.get((_req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'articulos.html'))
}).post(async (req,res) => {  

  try{
    articulos = await MongoDB.fetch_all(req.body.coleccion)
    res.send(articulos)
  } catch (error){
    console.log(error)
  }

})


app.route('/login')
  .get((req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'login.html'))
}).post(async (req, res) => {

  email = req.body.email
  pssw = req.body.pssw

  dbUserInfo = await MongoDB.getUserData(email,pssw)

  if(dbUserInfo.length == 0){

    req.session.email = email
    req.session.pssw = pssw

    return res.send('error')
  } else {
    return res.send('ok')
  }
})

app.route('/reservas')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'reservas.html'))
})


app.post('/register', async (req, res) => {

  let info = req.body

  response = await MongoDB.newUser(info)

  if(!response.acknowledged){
    return res.send('error')
  } else {
    return res.send('ok')
  }

})

