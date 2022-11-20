const path = require('path')
const fs = require('fs')
const include = ['cache']

const noblox = {
	wrap: require('./internal/wrap.js'),
}

function search (dir) {
  require('fs').readdirSync(dir).forEach(function (file) {
    const stat = fs.statSync(path.join(dir, file))
	if (file === 'cache') return;
    if (stat.isFile() || include.indexOf(file) !== -1) {
      noblox[file.replace('.js', '')] = require(dir + '/' + file)
    } else if (stat.isDirectory()) {
      search(path.join(dir, file))
    }
  })
}

search(__dirname)

module.exports = {
	getIdFromUsername: require('./user/getIdFromUsername'),
	getUsernameFromId: require('./user/getUsernameFromId'),
	getPlayerInfo: require('./user/getPlayerInfo'),
}

exports.options = require('./options.js')
exports.settings = require('../settings.json')
