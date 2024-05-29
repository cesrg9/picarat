const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.route('/')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.route('/login')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.route('/reservas')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'reservas.html'))
})

app.route('/carta')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'carta.html'))
})

app.route('/articulos')
  .get((_req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'articulos.html'))
})

app.listen(port, function () {
    console.log('Servidor iniciado en puerto:', port);
});