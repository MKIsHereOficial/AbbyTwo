/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Packages
const _chalk = require('chalk'), chalk = new _chalk.Instance(); 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function div() {
  return console.log(chalk.keyword('gray')(`|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||`));
}

module.exports = {
  div
}