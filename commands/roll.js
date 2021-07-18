const random = require('random');

/**
 * @deprecated
 * @type {import('../types/NormalCommand')}
 */
exports.run = async (client, message, args) => {
  if (!args[0]) return;

  let times = input = false;

  if (!args[0].split('d')[1]) {
    times = 1;
    input = args[0];
  } else {
    [times, input] = args[0].split('d');
  }

  if (!times) return;
  if (!input) {input = times; times = 1;}

  if (input < 1) {
    return message.reply(`:thinking: **|** O valor mínimo para roll é 1! Exemplo: \`.roll 1d20\``);
  }

  input = parseInt(input); times = parseInt(times);

  const MIN_VALUE = 1, MAX_VALUE = input;
  const FINAL_ADD = (args[1]) ? parseInt(args[1]) : 0;

  let values = [];
  let output = 0;

  for (i = 0; i < times; i++) {
    let num = random.int(MIN_VALUE, MAX_VALUE);

    values.push(num);
  }

  values.map(num => {
    output += num;
  })

  output += FINAL_ADD;

  return message.channel.send(`<a:loading:863161532506177537> **|** Hai! Você rolou **${input}** e...`).then(async msg => {
    setTimeout(async () => {
      await msg.edit(`
<a:exclamation:863161526188638248> **|** Hai! Você rolou **${input}** e... conseguiu **${output}**!
<a:like:863161530245054514> **|** \`${output}\` » ${values.join(" + ")}${FINAL_ADD > 0 ? ` (+${FINAL_ADD})` : ""}
`)
    }, 500);
  });
}

exports.help = {
  name: 'roll',
  labels: [
    'deprecated'
  ]
}