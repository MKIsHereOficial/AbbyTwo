const { DateTime, Duration } = require('luxon');
const { getFormattedTime } = require('../utils/time');

exports.run = (client, message) => {
  if (message.author.bot || !message.channel.guild) return; // Verificando se o usuário que enviou a mensagem é um bot, ou a mensagem não é de um servidor, caso um desses seja verdade, não vai acontecer nada

  const prefix = client.config.DEFAULT_PREFIX;

  if (message.content === `<@!${client.user.id}>` || message.content === `${client.user}`) {
    return message.channel.send(`${message.author}\n> Precisa de ajuda? Use \`\`${prefix}help\`\``);
  };


  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  command = client.commands.get(command);

  if (!command) return;
  if (command.help.isHost && !client.creators.join(" ").includes(message.author.id)) return;
  if (command.help.disabled) return;
  if (command.help.isAdmin && !message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${message.author}\nVocê não têm as permissões necessárias para utilizar esse comando, sinto muito!`);

  if (command.help.cooldown) {
    const getterString = `${command.help.name}_${message.author.id}_${message.channel.guild}`;

    if (!client.commandCooldown.get(getterString)) {
      client.commandCooldown.set(getterString, Date.now());

      setTimeout(() => {
        client.commandCooldown.delete(getterString);
      }, command.help.cooldown);
    } else {
      const diff = DateTime.now().diff(DateTime.fromMillis(client.commandCooldown.get(getterString))).shiftTo("second", "millisecond");
      
      return message.channel.send(`${message.author}\nVocê não pode usar esse comando por mais \`\`${getFormattedTime(diff)}\`\``).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 2500);
      });
    }

  }

  command.run(client, message, args);
}