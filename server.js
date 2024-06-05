/* 
  TODO:
    - Securizar todo el tema del login (contraseñas)
    - Profundizar un poco más en lo de las sessiones
    - Generate uuid en el session secret
    - Ver bien como va todo el tema del ok y error
    - Hacer un control de errores de la hostia mongodb y aquí
    - Hacer que la pagina del login sea o login o info del usuario (como listado_user)
    - Todo el tema de las reservas sigue pendiente

    04/06
    - Toda la confirmacion de reservas (pendiente)
    - Confirmacion de que esté logueado en login (que no deje hacer cosas si eso ya está)
    - **OPT** Ver si se puede cambiar el /login en funcion de si ya está logado
    - Hacer boton de logout
    - ** SI DA TIEMPO ** Hazme los estilos bonicos anda
    - Cambiar los estilos del textarea


    05/06
    - Revisar todos los textos (errores, sandeces, loremipsums, etc)
    - Añadir más datos para que al hacer las pruebas no se vea que la altura no está configurada
    - Filtrado de reservas en funcion de la sesion y del estado de las propias reservas
    - Segun parece ya hay algo hecho de reservas, ver qué y si sigue funcionando

    - Validar las entradas de datos
    - Afinar el tema de las reservas, hacerlo más bonito

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
.get((req, res) => {

  req.session.email = 'asd'
  req.session.admin = true

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

  if(dbUserInfo.length == 1){

    req.session.email = email

    if(dbUserInfo[0].data.admin){
      req.session.admin = true
    }

    return res.send('ok')
  } else {
    return res.send('error')
  }
})
app.route('/reservas')
  .get((req, res) => {

    if(!req.session.email){
      return res.redirect('/login')
    }
    return res.sendFile(path.join(__dirname, 'public', 'reservas.html'))
}).post(async (req,res) =>{

  try{
    articulos = await MongoDB.fetch_all(req.body.coleccion)
    res.send(articulos)
  } catch (error){
    console.log(error)
  }

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

app.post('/getButton', (req, res) => {
  if(req.session.email && req.session.admin){

    btn = `<button class="admin_btn">Modificar Información</button> <button class="admin_btn2">Añadir más Información</button>`
  
    return res.send(btn)
  }
})

app.post('/asignarReserva', async (req, res) => {

  email = req.session.email
  date = req.body.date
  n_personas = req.body.n_personas

  response = await MongoDB.newReserva(email, date, n_personas)

  if(response){
    return res.send('ok')
  } else {
    return res.send('error')
  }

})

app.post('/getInfo', async (req, res) => {
  try{
    eventos = await MongoDB.fetch_all(req.body.coleccion)
    res.send(eventos)
  } catch (error){
    console.log(error)
  }
})

app.post('/getInfoEvento', async (req, res) => {

  try{
    id = req.body.id
    coleccion = 'eventos'

    evento = await MongoDB.fetchOne(id, coleccion)
    return res.send(evento)

  } catch (error){
    console.log(error)
  }


})

app.post('/modifyElement', async (req, res) => {

  data = req.body.data
  coll = req.body.coll

  response = await MongoDB.findAndUpdate(data, coll)
  if(!response.acknowledged){
    return res.send('error')
  } else {
    return res.send('ok')
  }
})

app.post('/addElement', async (req, res) => {

  data = req.body.data
  coll = req.body.coll

  response = await MongoDB.addOne(data, coll)
  if(!response.acknowledged){
    return res.send('error')
  } else {
    return res.send('ok')
  }
})

app.post('/deleteElement', async (req, res) => {
  
  data = req.body.data
  coll = req.body.coll

  response = await MongoDB.deleteOne(data, coll)
  if(response.deletedCount !== 1){
    return res.send('error')
  } else {
    return res.send('ok')
  }
})