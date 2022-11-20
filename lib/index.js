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
	getIdFromUsername: noblox.wrap.wrapExport(require('./user/getIdFromUsername').func, require('./user/getIdFromUsername').required, require('./user/getIdFromUsername').optional || []),
	getUsernameFromId: noblox.wrap.wrapExport(require('./user/getUsernameFromId').func, require('./user/getUsernameFromId').required, require('./user/getUsernameFromId').optional || []),
	getPlayerInfo: noblox.wrap.wrapExport(require('./user/getPlayerInfo').func, require('./user/getPlayerInfo').required, require('./user/getPlayerInfo').optional || []),
	getPlayerThumbnail: noblox.wrap.wrapExport(require('./user/getPlayerThumbnail').func, require('./user/getPlayerThumbnail').required, require('./user/getPlayerThumbnail').optional || []),
}

exports.options = require('./options.js')
exports.settings = require('../settings.json')
