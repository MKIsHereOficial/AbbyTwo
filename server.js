const {DateTime} = require('luxon');

let client;

const express = require('express'), app = express();

app.get('/', (req, res) => {
  console.log(`%cNova request às ${DateTime.now().setZone("America/Sao_Paulo").toFormat(`HH:mm:ss:S`)}`, `color: #ff5e3a; font-weight: bold;`);

  res.send(client);
})

module.exports = app.listen(3000, () => {
  console.log(`Servidor iniciado na porta 3000`);
});

module.exports.setClient = (newClient) => {
  client = newClient;
}