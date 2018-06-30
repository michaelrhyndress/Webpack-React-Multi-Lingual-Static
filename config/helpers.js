//Paths
const path = require('path');
const _root = path.resolve(__dirname, '..');
exports.root = (args) => path.join.apply(path, [_root].concat(Array.prototype.slice.call(arguments, 0)));


//Internationalization
const RIGHT_TO_LEFT_LANGS = ['ar','dv','he','ku','fa','ur']
exports.RIGHT_TO_LEFT_LANGS = RIGHT_TO_LEFT_LANGS
exports.IsRightToLeft = (lang) => RIGHT_TO_LEFT_LANGS.includes(lang);
exports.root = root;