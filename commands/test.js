const Database = require('../utils/database.js');
const {MessageEmbed} = require('discord.js');

/**
 * @type {import('../types/NormalCommand')}
 */
exports.run = async(client, message, args) => {
    const db = await Database("chars");

    console.log(message.mentions);

    let target = message.mentions.users.first() || args[0] || message.author.id;

    const data = await db.exists(target['id'] || target || args[0]);

    const embed = new MessageEmbed()
    .setTitle(`Documento: ${db.database.name}/${data.key}`)
    .addField('Existe', data.exists)
    .addField('Valor', "```json\n"+JSON.stringify(data.value, null, 1)+"```")
    .setColor('#36393F');
    
    return message.reply(embed);
}

exports.help = {
    name: 'test',
    aliases: ['teste', 'test-function', 'early-access']
}