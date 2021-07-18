const getUptime = require('../utils/uptime');
const random = require('random');

exports.run = async (client) => { // Esse evento é usado assim que o bot é ligado e está pronto pra receber outros eventos.
  var index = 0;

  const prefix = client.config.DEFAULT_PREFIX;

  console.log(`${client.user.tag}: Client iniciado; ${client.users.cache.size} usuários e ${client.guilds.cache.size} servidores`);
  
  function setPresence() {
    const presences = [{text: `Uptime: ${getUptime(client).formatted}`}, `Prefixo: "${prefix}"`, `"${prefix}help" para ajuda com comandos`];
    index = random.int(0, presences.length - 1);
    var presence = "Em desenvolvimento...";
    if (!client.underDevelopment) presence = presences[index];

    client.user.setPresence({
      activity: {
        name: `🙏 | ${presence['text'] || presence}`,
        type: presence['type'] ? presence['type'] : "PLAYING"
      }
    })
  }

  setPresence();
  if (!client.underDevelopment) setInterval(setPresence, 5 * 1000);
}
