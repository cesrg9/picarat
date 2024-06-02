const express = require('express');
const MongoDB = require('./mongodb')
const path = require('path');
const app = express();

const port = 3030;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

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
    console.log(articulos)
    res.send(articulos)
  } catch (error){
    console.log(error)
  }

})


app.route('/login')
  .get((req, res) => {

    console.log(req)

    return res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

// app.route('/reservas')
//   .get((_req, res) => {
//     return res.sendFile(path.join(__dirname, 'public', 'reservas.html'))
// })





app.post('/getInfoEvento', async (req, res) => {

  id = req.body.id

  try{
    evento = await MongoDB.fetchOne(id, 'eventos')
    return res.send(evento[0].data)

  } catch (error){
    console.log(error)
  }

})
